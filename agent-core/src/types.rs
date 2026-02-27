use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};
use uuid::Uuid;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Message {
    pub role: String,
    pub content: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Entity {
    pub id: Uuid,
    pub label: String,
    pub entity_type: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Skill {
    pub name: String,
    pub description: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ContextPackage {
    pub user_id: Uuid,
    pub conversation_id: Uuid,
    pub agent_id: Uuid,
    pub message_history: Vec<Message>,
    pub relevant_memories: Vec<Entity>,
    pub available_skills: Vec<Skill>,
    pub budget_remaining: f64,
    pub start_time: DateTime<Utc>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct SkillContract {
    pub name: String,
    pub permissions: Vec<String>,
    pub timeout_ms: u32,
    pub memory_limit_mb: u32,
}
