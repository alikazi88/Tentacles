use pgvector::Vector;
use sqlx::{PgPool, Row};
use uuid::Uuid;

pub struct MemoryEngine {
    pub pool: PgPool,
}

impl MemoryEngine {
    pub async fn new(database_url: &str) -> Result<Self, sqlx::Error> {
        tracing::info!("Initializing Memory Engine (PgVector/Graph)...");
        let pool = PgPool::connect(database_url).await?;
        Ok(Self { pool })
    }

    /// Takes text input and its vector embedding and saves it to the `memory_entities` table
    pub async fn insert_entity(
        &self,
        user_id: Uuid,
        entity_type: &str,
        name: &str,
        embedding: Vec<f32>,
    ) -> Result<Uuid, sqlx::Error> {
        tracing::debug!("Inserting semantic entity: {}", name);
        let vec = Vector::from(embedding);

        let row = sqlx::query(
            r#"
            INSERT INTO memory_entities (user_id, entity_type, name, embedding)
            VALUES ($1, $2, $3, $4)
            RETURNING id
            "#,
        )
        .bind(user_id)
        .bind(entity_type)
        .bind(name)
        .bind(vec)
        .fetch_one(&self.pool)
        .await?;

        let id: Uuid = row.try_get("id")?;
        Ok(id)
    }

    /// Performs a semantic similarity search using pgvector's `<->` operator
    pub async fn semantic_search(
        &self,
        user_id: Uuid,
        query_embedding: Vec<f32>,
        limit: i64,
    ) -> Result<Vec<(Uuid, String, f64)>, sqlx::Error> {
        tracing::debug!("Performing semantic search across memory graph...");
        let vec = Vector::from(query_embedding);

        let rows = sqlx::query(
            r#"
            SELECT id, name, 1 - (embedding <-> $2) AS similarity
            FROM memory_entities
            WHERE user_id = $1
            ORDER BY embedding <-> $2 LIMIT $3
            "#,
        )
        .bind(user_id)
        .bind(vec)
        .bind(limit)
        .fetch_all(&self.pool)
        .await?;

        let results = rows
            .into_iter()
            .map(|row| {
                let id: Uuid = row.get("id");
                let name: String = row.get("name");
                let sim: f64 = row.get("similarity");
                (id, name, sim)
            })
            .collect();

        Ok(results)
    }
}
