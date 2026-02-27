use reqwest::Client;
use serde_json::json;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let client = Client::new();
    let res = client.post("http://localhost:11434/api/generate")
        .json(&json!({
            "model": "llama3",
            "prompt": "Say hello from the Tentacles AI Core!",
            "stream": false
        }))
        .send()
        .await?;

    let body = res.text().await?;
    println!("Ollama Response: {}", body);
    Ok(())
}
