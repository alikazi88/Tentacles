pub mod api;
pub mod memory;
pub mod models;
pub mod orchestrator;
pub mod skills;
pub mod types;

use std::sync::Arc;
use tracing_subscriber;

#[tokio::main]
async fn main() {
    tracing_subscriber::fmt::init();
    
    tracing::info!("Starting Intelligence Layer on 0.0.0.0:8080...");

    // 1. Initialize Sub-Systems
    let db_url = "postgresql://postgres:postgres@db.ztlvxiihxzjegtssikmm.supabase.co:5432/postgres"; // Placeholder for actual password logic
    let memory_engine = Arc::new(memory::MemoryEngine::new(db_url).await.expect("Failed to connect to Postgres pgvector DB"));
    let model_router = Arc::new(models::ModelRouter::new("http://localhost:11434".to_string()));

    // 2. Wrap via Orchestrator
    let orchestrator = Arc::new(orchestrator::AgentOrchestrator::new(model_router, memory_engine));

    // 3. Mount Axum API State
    let app_state = Arc::new(api::AppState { orchestrator });
    let app = api::router(app_state);

    let listener = tokio::net::TcpListener::bind("0.0.0.0:8080").await.unwrap();
    axum::serve(listener, app).await.unwrap();
}
