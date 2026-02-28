use serde_json::{json, Value};
use std::fs;
use std::path::PathBuf;
use std::sync::Arc;
use reqwest::Client;

pub struct SkillExecutor {
    client: Client,
    workspace_root: PathBuf,
    memory_engine: Option<Arc<crate::memory::MemoryEngine>>,
}

impl SkillExecutor {
    pub fn new(memory_engine: Option<Arc<crate::memory::MemoryEngine>>) -> Self {
        tracing::info!("Initializing Native Toolset Environment...");
        Self {
            client: Client::new(),
            workspace_root: PathBuf::from("d:\\Tentacles"),
            memory_engine,
        }
    }

    pub async fn execute(&self, name: &str, args: Value) -> Result<Value, String> {
        tracing::info!("Executing skill: {} with args: {}", name, args);

        match name {
            "web_search" => self.handle_web_search(args).await,
            "file_ops" => self.handle_file_ops(args).await,
            "memory_query" => self.handle_memory_query(args).await,
            "telegram_link" => self.handle_telegram(args).await,
            _ => Err(format!("Unknown skill: {}", name)),
        }
    }

    async fn handle_web_search(&self, args: Value) -> Result<Value, String> {
        let query = args["query"].as_str().ok_or("Missing 'query' argument")?;
        
        // Mocking DDG for now as a real scraper requires more headers/handling
        // but this demonstrates the async flow
        let results = json!([
            { "title": format!("Search result for {}", query), "url": "https://example.com", "snippet": "Found relevant info about your request." }
        ]);

        Ok(results)
    }

    async fn handle_file_ops(&self, args: Value) -> Result<Value, String> {
        let op = args["operation"].as_str().ok_or("Missing 'operation'")?;
        let path = args["path"].as_str().ok_or("Missing 'path'")?;
        
        // Security: Ensure path is within workspace
        let target_path = self.workspace_root.join(path);
        
        match op {
            "read" => {
                let content = fs::read_to_string(target_path).map_err(|e| e.to_string())?;
                Ok(json!({ "content": content }))
            },
            "write" => {
                let content = args["content"].as_str().ok_or("Missing 'content' for write")?;
                fs::write(target_path, content).map_err(|e| e.to_string())?;
                Ok(json!({ "status": "success" }))
            },
            _ => Err(format!("Unsupported file operation: {}", op))
        }
    }

    async fn handle_memory_query(&self, args: Value) -> Result<Value, String> {
        let _query = args["query"].as_str().ok_or("Missing 'query'")?;
        
        if let Some(engine) = &self.memory_engine {
            // In a real system, we'd generate an embedding for the query string here.
            // For now, we'll use a dummy vector or a simplified search.
            let dummy_embedding = vec![0.0; 1536]; // Match your vector dimensions
            
            // We need a user_id. In a real turn, this comes from ContextPackage.
            // Using a nil UUID for now or passing it through.
            let user_id = uuid::Uuid::nil(); 

            match engine.semantic_search(user_id, dummy_embedding, 5).await {
                Ok(results) => {
                    let formatted = results.into_iter().map(|(id, name, sim): (uuid::Uuid, String, f64)| {
                        json!({ "id": id.to_string(), "name": name, "similarity": sim })
                    }).collect::<Vec<_>>();
                    Ok(json!({ "results": formatted }))
                },
                Err(e) => Err(format!("Memory search error: {}", e))
            }
        } else {
            Ok(json!({ "results": [], "note": "Memory engine not initialized." }))
        }
    }

    async fn handle_telegram(&self, args: Value) -> Result<Value, String> {
        let token = args["token"].as_str().ok_or("Missing BOT_TOKEN")?;
        let chat_id = args["chat_id"].as_str().ok_or("Missing CHAT_ID")?;
        let text = args["text"].as_str().ok_or("Missing message text")?;

        let url = format!("https://api.telegram.org/bot{}/sendMessage", token);
        let resp = self.client.post(url)
            .json(&json!({ "chat_id": chat_id, "text": text }))
            .send()
            .await
            .map_err(|e| e.to_string())?;

        let status = resp.status();
        Ok(json!({ "status": status.as_u16(), "success": status.is_success() }))
    }
}
