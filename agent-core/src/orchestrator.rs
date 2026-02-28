use crate::memory::MemoryEngine;
use crate::models::AgentModelRouter;
use crate::skills::SkillExecutor;
use crate::types::ContextPackage;
use std::sync::Arc;
use serde_json::Value;
use regex::Regex;

pub struct AgentOrchestrator {
    pub model_router: Arc<AgentModelRouter>,
    pub memory_engine: Arc<MemoryEngine>,
    pub skill_executor: Arc<SkillExecutor>,
}

impl AgentOrchestrator {
    pub fn new(
        model_router: Arc<AgentModelRouter>, 
        memory_engine: Arc<MemoryEngine>,
        skill_executor: Arc<SkillExecutor>
    ) -> Self {
        tracing::info!("Initializing Autonomous Agent Orchestrator...");
        Self {
            model_router,
            memory_engine,
            skill_executor,
        }
    }

    pub async fn process_turn(&self, context: &ContextPackage, message: &str) -> String {
        tracing::info!("Processing autonomous turn for User: {}", context.user_id);

        let system_prompt = r#"You are the Tentacles OS System Architect. 
You possess autonomous agency and the power to evolve your own environment.
Your goal is to fulfill user requests by planning, executing, and verifying changes to the codebase.

AVAILABLE TOOLS:
- web_search({"query": "topic"}): Search DuckDuckGo for live info.
- file_ops({"operation": "read|write", "path": "relative_path", "content": "optional_data"}): Read or write files in d:\Tentacles.
- memory_query({"query": "concept"}): Search semantic long-term memory.
- telegram_link({"token": "str", "chat_id": "str", "text": "str"}): Push notifications.

RESPONSE FORMAT:
If you need a tool, respond with:
Thought: Your reasoning for using the tool.
Action: CALL: tool_name({"key": "val"})

Once you have the tool result, continue until you have a final answer:
Final Answer: Your final response to the user.

RULES:
1. Always read a file before modifying it.
2. Use terminal_exec (via shell commands in file_ops or separate if implemented) to check builds.
3. Be proactive. If the user asks for a feature, implement it.
"#;

        let mut conversation_history = format!("SYSTEM: {}\nUSER: {}", system_prompt, message);
        let mut final_response = String::new();
        let mut loop_count = 0;
        const MAX_LOOPS: u32 = 5;

        while loop_count < MAX_LOOPS {
            tracing::debug!("Autonomous Loop #{}", loop_count + 1);
            
            let response = match self.model_router.route_inference("qwen3:8b", &conversation_history).await {
                Ok(reply) => reply,
                Err(e) => {
                    final_response = format!("Error from LLM Router: {}", e);
                    break;
                }
            };

            // Detect Tool Call
            if let Some((name, args)) = self.parse_tool_call(&response) {
                tracing::info!("Executing Tool: {} with {:?}", name, args);
                
                match self.skill_executor.execute(&name, args).await {
                    Ok(result) => {
                        conversation_history.push_str(&format!("\nASSISTANT: {}\nOBSERVATION: {}", response, result));
                        loop_count += 1;
                    },
                    Err(e) => {
                        conversation_history.push_str(&format!("\nASSISTANT: {}\nOBSERVATION: Error executing skill: {}", response, e));
                        loop_count += 1;
                    }
                }
            } else {
                // No tool call detected, this is either a normal message or the final answer
                final_response = response;
                break;
            }
        }

        // Final cleanup for UI presentation
        if final_response.contains("Final Answer:") {
            final_response = final_response.split("Final Answer:").last().unwrap_or(&final_response).trim().to_string();
        }

        // --- Auto-Remember Phase ---
        // Extract and index semantic entities from the user's message
        let _ = self.auto_remember(context.user_id, message).await;

        final_response
    }

    /// Background task to extract and index semantic entities
    pub async fn auto_remember(&self, user_id: uuid::Uuid, text: &str) -> Result<(), String> {
        tracing::info!("Auto-Remember: Extracting entities from turn...");
        
        let entities = self.extract_entities(text).await?;
        
        for entity in entities {
            let name = entity["name"].as_str().unwrap_or("");
            let e_type = entity["type"].as_str().unwrap_or("topic");
            let desc = entity["description"].as_str().unwrap_or("");
            let importance = entity["importance"].as_f64().unwrap_or(0.5);

            if name.is_empty() { continue; }

            // Generate embedding for the entity name + description
            let embed_text = format!("{}: {}", name, desc);
            match self.model_router.generate_embedding("qwen3:8b", &embed_text).await {
                Ok(embedding) => {
                    let _ = self.memory_engine.insert_entity(
                        user_id,
                        e_type,
                        name,
                        desc,
                        importance,
                        embedding
                    ).await.map_err(|e| e.to_string())?;
                    tracing::debug!("Indexed entity: {} ({})", name, e_type);
                },
                Err(e) => tracing::error!("Failed to generate embedding for {}: {}", name, e),
            }
        }

        Ok(())
    }

    async fn extract_entities(&self, text: &str) -> Result<Vec<Value>, String> {
        let prompt = format!(
            r#"Return a JSON array of semantic entities found in the following text. 
Identify People, Projects, Topics, Events, Organizations, or Files.
Each entity must have: "name", "type" (one of: person, project, topic, file, event, decision, organization), "description", and "importance" (0.0 to 1.0).

OUTPUT ONLY VALID JSON.
Text: {}"#,
            text
        );

        let response = self.model_router.route_inference("qwen3:8b", &prompt).await?;
        
        // Clean up response to find JSON block if model gets chatty
        let json_str = if let Some(start) = response.find('[') {
            if let Some(end) = response.rfind(']') {
                &response[start..=end]
            } else {
                &response
            }
        } else {
            &response
        };

        let entities: Vec<Value> = serde_json::from_str(json_str).map_err(|e| format!("Failed to parse entity JSON: {}", e))?;
        Ok(entities)
    }

    fn parse_tool_call(&self, response: &str) -> Option<(String, Value)> {
        // Robust regex for CALL: tool_name({...})
        let re = Regex::new(r"CALL:\s*([a-zA-Z0-9_]+)\s*\(([\s\S]*?)\)").ok()?;
        let caps = re.captures(response)?;
        
        let name = caps.get(1)?.as_str().to_string();
        let args_json = caps.get(2)?.as_str().trim();
        
        let args: Value = serde_json::from_str(args_json).ok()?;
        Some((name, args))
    }
}
