use axum::{extract::State, routing::post, Json, Router};
use serde::{Deserialize, Serialize};
use std::sync::Arc;
use crate::orchestrator::AgentOrchestrator;
use crate::types::ContextPackage;
use uuid::Uuid;
use chrono::Utc;

pub struct AppState {
    pub orchestrator: Arc<AgentOrchestrator>,
}

pub fn router(state: Arc<AppState>) -> Router {
    Router::new()
        .route("/api/v1/chat", post(handle_chat))
        .with_state(state)
}

#[derive(Deserialize)]
pub struct ChatRequest {
    pub message: String,
    pub conversation_id: String,
    pub agent_id: Option<String>,
}

#[derive(Serialize)]
pub struct ChatResponse {
    pub reply: String,
    pub status: String,
}

async fn handle_chat(
    State(state): State<Arc<AppState>>,
    Json(req): Json<ChatRequest>,
) -> Json<ChatResponse> {
    tracing::info!("Received chat message: {}", req.message);
    
    // Construct dummy ContextPackage for now
    let context = ContextPackage {
        user_id: Uuid::new_v4(),
        conversation_id: Uuid::parse_str(&req.conversation_id).unwrap_or(Uuid::new_v4()),
        agent_id: Uuid::parse_str(&req.agent_id.unwrap_or_default()).unwrap_or(Uuid::new_v4()),
        message_history: vec![],
        relevant_memories: vec![],
        available_skills: vec![],
        budget_remaining: 100.0,
        start_time: Utc::now(),
    };

    // Execute the core Orchestration Turn
    let reply = state.orchestrator.process_turn(&context, &req.message).await;

    Json(ChatResponse {
        reply,
        status: "success".to_string(),
    })
}
