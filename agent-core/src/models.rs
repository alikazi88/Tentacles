use reqwest::Client;
use serde_json::json;

pub struct ModelRouter {
    client: Client,
    pub local_host: String,
}

impl ModelRouter {
    pub fn new(local_host: String) -> Self {
        tracing::info!("Initializing Model Router (Ollama @ {})", local_host);
        Self {
            client: Client::new(),
            local_host,
        }
    }

    /// Primary inference router deciding how to handle a turn and generating the response.
    /// Right now, it defaults strictly to local Ollama execution as a baseline.
    pub async fn route_inference(&self, model: &str, prompt: &str) -> Result<String, Box<dyn std::error::Error>> {
        tracing::info!("Routing query to {}...", model);
        
        // Target Ollama Generate Endpoint
        let url = format!("{}/api/generate", self.local_host);
        
        let payload = json!({
            "model": model,
            "prompt": prompt,
            "stream": false
        });

        let response = self.client.post(&url)
            .json(&payload)
            .send()
            .await?;

        if !response.status().is_success() {
            return Err(format!("Model API error: {}", response.status()).into());
        }

        let resp_json: serde_json::Value = response.json().await?;
        
        if let Some(reply) = resp_json.get("response").and_then(|r| r.as_str()) {
            Ok(reply.to_string())
        } else {
            Err("Failed to parse Ollama response format".into())
        }
    }
}
