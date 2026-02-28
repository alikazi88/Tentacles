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
    // Verified IPv4 Transaction Pooler (Port 6543) from Supabase Dashboard
    // statement_cache_capacity=0 is MANDATORY for transaction pooling
    let db_url = "postgresql://postgres.ztlvxiihxzjegtssikmm:Siberia%4014568@aws-1-us-east-1.pooler.supabase.com:6543/postgres?statement_cache_capacity=0"; 
    let memory_engine = Arc::new(memory::MemoryEngine::new(db_url).await.expect("Failed to connect to Postgres pgvector DB"));
    let model_router = Arc::new(models::ModelRouter::new("http://localhost:11434".to_string()));
    let skill_executor = Arc::new(skills::SkillExecutor::new(Some(memory_engine.clone())));

    // 2. Wrap via Orchestrator
    let orchestrator = Arc::new(orchestrator::AgentOrchestrator::new(model_router, memory_engine, skill_executor));

    // 3. Mount Axum API State
    let app_state = Arc::new(api::AppState { orchestrator });
    let app = api::router(app_state);

    let listener = tokio::net::TcpListener::bind("0.0.0.0:8080").await.unwrap();
    axum::serve(listener, app).await.unwrap();
}
