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

        final_response
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
