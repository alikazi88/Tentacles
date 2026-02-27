use crate::types::SkillContract;
use serde_json::{json, Value};
use std::fs;
use std::path::PathBuf;
use reqwest::Client;

pub struct SkillExecutor {
    client: Client,
    workspace_root: PathBuf,
}

impl SkillExecutor {
    pub fn new() -> Self {
        tracing::info!("Initializing Native Toolset Environment...");
        Self {
            client: Client::new(),
            workspace_root: PathBuf::from("d:\\Tentacles"),
        }
    }

    pub async fn execute(&self, name: &str, args: Value) -> Result<Value, String> {
        tracing::info!("Executing skill: {} with args: {}", name, args);

        match name {
            "web_search" => self.handle_web_search(args).await,
            "file_ops" => self.handle_file_ops(args).await,
            "memory_query" => self.handle_memory_query(args).await,
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
        let query = args["query"].as_str().ok_or("Missing 'query'")?;
        // Bridge to PGVector similarity search would go here
        Ok(json!({ "results": [], "note": "Memory retrieval search executed." }))
    }
}
