use crate::types::ContextPackage;
use crate::models::ModelRouter;
use crate::memory::MemoryEngine;
use crate::skills::SkillExecutor;
use std::sync::Arc;
use serde_json::Value;

pub struct AgentOrchestrator {
    pub model_router: Arc<ModelRouter>,
    pub memory_engine: Arc<MemoryEngine>,
    pub skill_executor: Arc<SkillExecutor>,
}

impl AgentOrchestrator {
    pub fn new(
        model_router: Arc<ModelRouter>, 
        memory_engine: Arc<MemoryEngine>,
        skill_executor: Arc<SkillExecutor>
    ) -> Self {
        tracing::info!("Initializing Agent Orchestrator...");
        Self {
            model_router,
            memory_engine,
            skill_executor,
        }
    }

    pub async fn process_turn(&self, context: &ContextPackage, message: &str) -> String {
        tracing::info!("Processing turn for User: {}", context.user_id);
        
        // 1. (Future) Intent Classification  ->  2. Context Retrieval
        tracing::debug!("Searching graph memory for context relevant to: {}", message);
        let _recent_memories = self.memory_engine.semantic_search(
            context.user_id, 
            vec![0.1; 768], // Dummy embedding placeholder until local nomic-embed is wired
            5
        ).await.unwrap_or_default();

        // 3. Model Call (Execution)
        let mut response = match self.model_router.route_inference("qwen3:8b", message).await {
            Ok(reply) => reply,
            Err(e) => format!("Error from LLM Router: {}", e),
        };

        // 4. (Optional) Tool Loop Detection [BASIC VERSION]
        // If response contains "CALL: tool_name(args)"
        if response.contains("CALL:") {
            if let Some(tool_call) = self.parse_tool_call(&response) {
                let (name, args) = tool_call;
                match self.skill_executor.execute(&name, args).await {
                    Ok(result) => {
                        let tool_message = format!("{}\nTOOL_RESULT: {}", message, result);
                        response = self.model_router.route_inference("qwen3:8b", &tool_message).await.unwrap_or_else(|e| e.to_string());
                    },
                    Err(e) => response = format!("Skill Execution Error: {}", e),
                }
            }
        }

        // 5. Memory Extraction
        let _ = self.memory_engine.insert_entity(
            context.user_id,
            "topic",
            "User Message Memory",
            vec![0.1; 768] // Dummy embedding
        ).await;

        // 6. Response Streaming / Return
        response
    }

    fn parse_tool_call(&self, response: &str) -> Option<(String, Value)> {
        // Simple manual parse for: CALL: web_search({"query": "rust news"})
        // In a real app, use regex or the LLM's structural output
        let parts: Vec<&str> = response.split("CALL:").collect();
        if parts.len() < 2 { return None; }
        
        let call_str = parts[1].trim();
        let name_end = call_str.find('(')?;
        let name = call_str[..name_end].trim().to_string();
        
        let args_start = name_end + 1;
        let args_end = call_str.rfind(')')?;
        let args_json = &call_str[args_start..args_end];
        
        let args: Value = serde_json::from_str(args_json).ok()?;
        Some((name, args))
    }
}
