pub mod api;
pub mod memory;
pub mod models;
pub mod orchestrator;
pub mod skills;
pub mod types;

use tracing_subscriber;

#[tokio::main]
async fn main() {
    tracing_subscriber::fmt::init();
    
    // Mount the API Router for incoming frontend calls
    let app = api::router();

    tracing::info!("Starting Intelligence Layer orchestrator on 0.0.0.0:8080...");
    let listener = tokio::net::TcpListener::bind("0.0.0.0:8080").await.unwrap();
    axum::serve(listener, app).await.unwrap();
}
