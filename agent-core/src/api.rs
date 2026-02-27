use axum::{routing::post, Router, Json};
use serde::{Deserialize, Serialize};

pub fn router() -> Router {
    Router::new()
        .route("/api/v1/chat", post(handle_chat))
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

async fn handle_chat(Json(req): Json<ChatRequest>) -> Json<ChatResponse> {
    // Future: Call orchestrator to handle the turn
    tracing::info!("Received chat message for conversation: {}", req.conversation_id);
    
    Json(ChatResponse {
        reply: format!("Acknowledged: {}", req.message),
        status: "success".to_string(),
    })
}
