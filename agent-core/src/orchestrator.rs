use crate::types::ContextPackage;
use crate::models::ModelRouter;
use crate::memory::MemoryEngine;
use std::sync::Arc;

pub struct AgentOrchestrator {
    pub model_router: Arc<ModelRouter>,
    pub memory_engine: Arc<MemoryEngine>,
}

impl AgentOrchestrator {
    pub fn new(model_router: Arc<ModelRouter>, memory_engine: Arc<MemoryEngine>) -> Self {
        tracing::info!("Initializing Agent Orchestrator...");
        Self {
            model_router,
            memory_engine,
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
        let response = match self.model_router.route_inference("llama3", message).await {
            Ok(reply) => reply,
            Err(e) => format!("Error from LLM Router: {}", e),
        };

        // 4. Memory Extraction
        let _ = self.memory_engine.insert_entity(
            context.user_id,
            "topic",
            "User Message Memory",
            vec![0.1; 768] // Dummy embedding
        ).await;

        // 5. Response Streaming / Return
        response
    }
}
