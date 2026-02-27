use axum::{routing::get, Router};
use tracing_subscriber;

#[tokio::main]
async fn main() {
    // Initialize tracing
    tracing_subscriber::fmt::init();

    // Setup dummy router
    let app = Router::new().route("/", get(|| async { "Agent Core Orcherstrator Running" }));

    tracing::info!("Starting agent-core layer on 8080...");
    let listener = tokio::net::TcpListener::bind("0.0.0.0:8080").await.unwrap();
    axum::serve(listener, app).await.unwrap();
}
