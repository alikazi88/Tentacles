use reqwest::Client;
use serde_json::json;
use sqlx::PgPool;
use std::sync::Arc;
use uuid::Uuid;

pub struct AgentModelRouter {
    client: Client,
    pub local_host: String,
    pub pool: Option<Arc<PgPool>>,
}

impl AgentModelRouter {
    pub fn new(local_host: String, pool: Option<Arc<PgPool>>) -> Self {
        tracing::info!("Initializing Intelligent Model Router (Ollama @ {})", local_host);
        Self {
            client: Client::new(),
            local_host,
            pool,
        }
    }

    /// Classifies the task based on the prompt content.
    fn classify_task(&self, prompt: &str) -> String {
        let p = prompt.to_lowercase();
        if p.contains("code") || p.contains("function") || p.contains("rust") || p.contains("python") {
            "coding".to_string()
        } else if p.contains("search") || p.contains("find") || p.contains("who is") {
            "research".to_string()
        } else {
            "general".to_string()
        }
    }

    /// Finds the best model for a given task by querying routing rules and joining with the models table.
    async fn get_routing_target(&self, task: &str) -> (String, Option<String>) {
        if let Some(pool) = &self.pool {
            let row = sqlx::query(
                r#"
                SELECT 
                    m1.name as primary_name,
                    m2.name as fallback_name
                FROM routing_rules r
                JOIN models m1 ON r.primary_model_id = m1.id
                LEFT JOIN models m2 ON r.fallback_model_id = m2.id
                WHERE r.name = $1 AND r.is_active = true
                LIMIT 1
                "#
            )
            .bind(task)
            .fetch_optional(pool.as_ref())
            .await;

            if let Ok(Some(row)) = row {
                use sqlx::Row;
                let primary: String = row.get("primary_name");
                let fallback: Option<String> = row.get("fallback_name");
                
                return (primary, fallback);
            }
        }
        
        ("qwen3:8b".to_string(), None) // Default fallback
    }

    /// Primary inference router deciding how to handle a turn and generating the response.
    pub async fn route_inference(&self, model: &str, prompt: &str) -> Result<String, String> {
        let task = self.classify_task(prompt);
        let (target_model, fallback) = self.get_routing_target(&task).await;
        
        // Use the requested model if it's not the default, otherwise use routed target
        let active_model = if model == "qwen3:8b" || model == "default" { &target_model } else { model };

        tracing::info!("Routing query [Task: {}] to {}...", task, active_model);
        
        match self.execute_inference(active_model, prompt).await {
            Ok(res) => Ok(res),
            Err(e) => {
                if let Some(fb_model) = fallback {
                    tracing::warn!("Primary model {} failed: {}. Retrying with fallback {}...", active_model, e, fb_model);
                    self.execute_inference(&fb_model, prompt).await
                } else {
                    Err(e)
                }
            }
        }
    }

    async fn execute_inference(&self, model: &str, prompt: &str) -> Result<String, String> {
        let url = format!("{}/api/generate", self.local_host);
        let payload = json!({
            "model": model,
            "prompt": prompt,
            "stream": false
        });

        let response = self.client.post(&url)
            .json(&payload)
            .send()
            .await.map_err(|e| e.to_string())?;

        if !response.status().is_success() {
            return Err(format!("Model API error: {}", response.status()));
        }

        let resp_json: serde_json::Value = response.json().await.map_err(|e| e.to_string())?;
        if let Some(reply) = resp_json.get("response").and_then(|r| r.as_str()) {
            Ok(reply.to_string())
        } else {
            Err("Failed to parse Ollama response format".to_string())
        }
    }
}
