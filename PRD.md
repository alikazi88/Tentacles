# Tentacles - Product Requirements Document

## Executive Summary

**Tentacles** is an advanced personal AI operating system that extends beyond traditional AI assistants. Built as an enhanced evolution of OpenClaw.ai, Tentacles combines intelligent agents, modular skills, multi-model orchestration, and persistent memory into a unified, secure, and intuitive platform.

Unlike simple chatbots, Tentacles operates as an **AI Operating System** where users can deploy specialized agents, equip them with skills, and orchestrate complex workflows - all while maintaining complete control over their data, costs, and privacy.

**Core Philosophy**: "Many minds, one purpose. Modular intelligence that adapts to you."

---

## What's New vs. OpenClaw.ai

| OpenClaw.ai | Tentacles Evolution |
|-------------|---------------------|
| Single agent mode | **Multi-Agent Orchestration** - Multiple specialized agents working together |
| Fixed skill set | **Dynamic Skill System** - Install, configure, and create custom skills |
| Basic model selection | **Intelligent Model Routing** - Automatic model selection per task with cost optimization |
| File-based memory | **Graph Neural Memory** - Relational, temporal, and semantic memory network |
| Individual operation | **Agent Teams** - Collaborative AI teams for complex projects |
| Manual tool configuration | **Visual Skill Builder** - No-code tool creation and workflow design |

---

## System Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         PRESENTATION LAYER                              │
│                    (React 18 + Vite + Tailwind CSS)                      │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐  │
│  │   Chat      │  │  Agent      │  │   Skill     │  │   Memory        │  │
│  │  Interface  │  │  Command    │  │   Studio    │  │   Explorer      │  │
│  │             │  │   Center    │  │             │  │                 │  │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────────┘  │
├─────────────────────────────────────────────────────────────────────────┤
│                         ORCHESTRATION LAYER                             │
│                    (Supabase + Edge Functions + Realtime)                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐  │
│  │   Agent     │  │   Skill     │  │   Model     │  │   Session       │  │
│  │   Router    │  │  Registry   │  │   Router    │  │   Manager       │  │
│  │             │  │             │  │             │  │                 │  │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────────┘  │
├─────────────────────────────────────────────────────────────────────────┤
│                         INTELLIGENCE LAYER                              │
│                      (Rust/Go Agent Core + WASM)                          │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐  │
│  │   Agent     │  │   Skill       │  │   Memory      │  │   Tool          │  │
│  │   Runtime   │  │   Executor    │  │   Engine      │  │   Sandbox       │  │
│  │             │  │               │  │   (Graph)     │  │   (WASM)        │  │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────────┘  │
├─────────────────────────────────────────────────────────────────────────┤
│                         MODEL LAYER                                     │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐  │
│  │   Local     │  │   Cloud     │  │   Specialized │  │   Fine-tuned    │  │
│  │   Models    │  │   Models    │  │   Models      │  │   Models        │  │
│  │  (Ollama)   │  │  (API)      │  │  (Code/Vision)│  │  (User-trained) │  │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────────┘  │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Core Concepts

### 1. Agents
**Definition**: Specialized AI personas with specific expertise, personality, and capabilities.

**Agent Types**:
- **Generalist**: Default assistant for everyday tasks
- **Coder**: Software development, debugging, architecture
- **Researcher**: Information gathering, analysis, synthesis
- **Writer**: Content creation, editing, storytelling
- **Analyst**: Data analysis, visualization, reporting
- **Planner**: Project management, scheduling, coordination
- **Custom**: User-created agents for specific workflows

### 2. Skills
**Definition**: Modular capabilities that can be attached to any agent, extending their functionality.

**Skill Categories**:
- **System Skills**: File operations, code execution, web search
- **Integration Skills**: GitHub, Slack, Gmail, Calendar, Notion
- **Data Skills**: Database queries, spreadsheet manipulation, PDF processing
- **Creative Skills**: Image generation, audio processing, video editing
- **Custom Skills**: User-created or community-contributed capabilities

### 3. Models
**Definition**: The underlying LLM brains that power agents, with intelligent routing based on task requirements.

**Model Tiers**:
- **Local Tier**: Privacy-first, cost-free (Llama 3.1, Mistral, CodeLlama)
- **Standard Tier**: Balanced quality/cost (GPT-4o-mini, Claude 3 Haiku)
- **Premium Tier**: Maximum capability (GPT-4o, Claude 3.5 Sonnet, o1)
- **Specialized Tier**: Domain-specific (Code, Vision, Math, Legal)

---

## Detailed Feature Specifications

### Feature 1: Multi-Agent System

#### 1.1 Agent Command Center

```
┌─────────────────────────────────────────────────────────────────────────┐
│  Tentacles                                    [🔔] [👤] [⚙️]           │
├─────────────────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │  🤖 Active Agents                    [+ Deploy Agent]           │   │
│  │                                                                  │   │
│  │  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ │   │
│  │  │ 🎯 General  │ │ 💻 Coder    │ │ 🔍 Research │ │ 📊 Analyst  │ │   │
│  │  │             │ │             │ │             │ │             │ │   │
│  │  │ Status: 🟢  │ │ Status: ⚪  │ │ Status: 🟡  │ │ Status: ⚪  │ │   │
│  │  │ Tasks: 3    │ │ Tasks: 0    │ │ Tasks: 1    │ │ Tasks: 0    │ │   │
│  │  │             │ │             │ │             │ │             │ │   │
│  │  │ [Chat]      │ │ [Activate]  │ │ [View Task] │ │ [Activate]  │ │   │
│  │  │ [Configure] │ │             │ │             │ │             │ │   │
│  │  └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘ │   │
│  │                                                                  │   │
│  │  🟢 Active  ⚪ Standby  🟡 Busy  🔴 Error                        │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │  🧩 Available Agents                                            │   │
│  │                                                                  │   │
│  │  📝 Writer    🎨 Designer    🔧 DevOps    🧠 Strategist        │   │
│  │  [Deploy]     [Deploy]        [Deploy]     [Deploy]              │   │
│  │                                                                  │   │
│  │  [🛠️ Create Custom Agent]  [🏪 Browse Agent Marketplace]         │   │
│  └─────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────┘
```

#### 1.2 Agent Configuration

Each agent has configurable parameters:

| Setting | Options | Impact |
|---------|---------|--------|
| **Base Model** | Local/Cloud selection | Speed, cost, quality balance |
| **Temperature** | 0.0 - 1.0 | Creativity vs. determinism |
| **Context Window** | 4K - 128K tokens | How much history is remembered |
| **System Prompt** | Customizable | Personality and behavior |
| **Active Skills** | Multi-select | Capabilities available |
| **Memory Access** | Full/Recent/None | What agent can remember |
| **Budget Cap** | $/day limit | Cost control |
| **Approval Level** | Auto/Notify/Confirm | Safety settings |

#### 1.3 Agent Collaboration

**Swarm Mode**: Multiple agents working on the same task
- **Example**: Research project
  1. **Researcher** gathers sources and creates summary
  2. **Analyst** identifies patterns and creates data visualizations
  3. **Writer** synthesizes findings into report
  4. **Generalist** reviews and formats final output

**Handoff Mode**: Agents passing tasks to specialists
- User asks Coder to "analyze user feedback"
- Coder detects sentiment analysis needed
- Hands off to Analyst for processing
- Returns with structured insights

---

### Feature 2: Skill System

#### 2.1 Skill Studio

```
┌─────────────────────────────────────────────────────────────────────────┐
│  Skill Studio                                    [+ Create Skill]       │
├─────────────────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌─────────────────────────────────────────────────┐ │
│  │  CATEGORIES  │  │  🔧 File Operations                             │ │
│  │              │  │                                                 │ │
│  │  🛠️ System   │  │  Read, write, and manage files in your         │ │
│  │  🔗 Integrate│  │  workspace with intelligent parsing.            │ │
│  │  📊 Data     │  │                                                 │ │
│  │  🎨 Creative │  │  ┌─────────────────────────────────────────┐     │ │
│  │  🤖 AI       │  │  │ Capabilities:                             │     │ │
│  │  🔒 Security │  │  │ • Read files (txt, md, pdf, docx)       │     │ │
│  │              │  │  │ • Write and edit files                  │     │ │
│  │  ─────────── │  │  │ • Directory listing                       │     │ │
│  │              │  │  │ • File search with content              │     │ │
│  │  MY SKILLS   │  │  │ • Auto-format conversion                  │     │ │
│  │              │  │  └─────────────────────────────────────────┘     │ │
│  │  ⭐ Custom 1 │  │                                                 │ │
│  │  ⭐ Custom 2 │  │  Permissions Required:                          │ │
│  │              │  │  📁 File System Access (~/Tentacles)           │ │
│  │              │  │                                                 │ │
│  │  [+ Create]  │  │  [Configure] [Test] [Add to Agent] [Disable]   │ │
│  │              │  │                                                 │ │
│  └──────────────┘  └─────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────┘
```

#### 2.2 Built-in Skills Catalog

| Skill | Category | Description | Permissions |
|-------|----------|-------------|-------------|
| **File Operations** | System | Read/write files, search, organize | File system |
| **Code Executor** | System | Run Python, JS, shell in sandbox | Sandbox |
| **Web Search** | System | DuckDuckGo, Brave Search | Network |
| **Browser** | System | Visit URLs, extract content | Network |
| **GitHub** | Integration | Repos, issues, PRs, actions | GitHub API |
| **Slack** | Integration | Send messages, read channels | Slack API |
| **Gmail** | Integration | Read, send, search emails | Gmail API |
| **Calendar** | Integration | Read events, create meetings | Calendar API |
| **Notion** | Integration | Read/write pages, databases | Notion API |
| **Database** | Data | SQL queries, schema exploration | DB connection |
| **Spreadsheet** | Data | Excel/CSV analysis, formulas | File system |
| **PDF Processor** | Data | OCR, extraction, summarization | File system |
| **Image Gen** | Creative | Generate images via local/AI models | Compute |
| **Audio** | Creative | Transcribe, synthesize speech | Microphone |
| **Vision** | AI | Analyze images, charts, diagrams | Vision model |
| **Embeddings** | AI | Create/search vector embeddings | Compute |

#### 2.3 Custom Skill Builder

**No-Code Mode**:
- Visual workflow builder (drag-and-drop)
- Pre-built blocks: API calls, data transforms, conditionals
- Template library (50+ starter templates)

**Code Mode**:
- Write skills in Python, JavaScript, or Rust
- WASM compilation for sandboxed execution
- Built-in testing environment
- One-click publish to marketplace

**Skill Manifest Format**:
```yaml
name: "Custom API Integration"
version: "1.0.0"
author: "user@example.com"
description: "Connect to internal company API"
icon: "🔌"
category: "integration"
permissions:
  - network:api.example.com
  - storage:cache
inputs:
  - name: "endpoint"
    type: "string"
    required: true
  - name: "method"
    type: "enum"
    options: ["GET", "POST", "PUT", "DELETE"]
    default: "GET"
outputs:
  - name: "response"
    type: "json"
execution:
  runtime: "wasm"
  handler: "main.handle_request"
  timeout: 30
  memory_limit: "128mb"
```

---

### Feature 3: Model Management

#### 3.1 Model Router

```
┌─────────────────────────────────────────────────────────────────────────┐
│  Model Router & Optimization                                            │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  🧠 Intelligent Routing Configuration                                    │
│  ─────────────────────────────────────────────────────────────────     │
│                                                                         │
│  Default Strategy: [Smart Balance ▼]                                    │
│  • Maximize Quality  • Smart Balance  • Minimize Cost  • Local Only     │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │  Task Type          │ Preferred Model    │ Fallback    │ Budget  │   │
│  ├───────────────────────┼────────────────────┼─────────────┼─────────┤   │
│  │  General Chat         │ Llama 3.1 8B       │ GPT-4o-mini │ $0.00   │   │
│  │  Code Generation      │ CodeLlama 13B      │ Claude 3.5  │ $0.05   │   │
│  │  Complex Analysis     │ Claude 3.5 Sonnet  │ GPT-4o      │ $0.50   │   │
│  │  Creative Writing     │ Mistral Large      │ GPT-4o      │ $0.30   │   │
│  │  Vision/Images        │ LLaVA 1.6          │ GPT-4o      │ $0.10   │   │
│  │  Long Context         │ Claude 3.5 200K    │ GPT-4o 128K │ $1.00   │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
│  💰 Cost Controls                                                        │
│  Daily Budget: $[20.00] USD                    [Set Alert at: $15.00]  │
│  Current Usage Today: $3.45 / $20.00 (17%)                            │
│                                                                         │
│  🔄 Model Fallback Rules                                                │
│  If primary model fails: [Use Fallback ▼]                             │
│  • Use Fallback  • Skip to Next Task  • Ask User  • Pause & Notify      │
│                                                                         │
│  📊 Usage Statistics                                                    │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐   │
│  │  Local: 85% │  │  Cloud: 15% │  │  Saved: $34 │  │  Avg: $0.02 │   │
│  │  142 calls  │  │  23 calls   │  │  this week  │  │  per task   │   │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘   │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

#### 3.2 Model Capabilities Matrix

| Model | Provider | Context | Strengths | Cost/1M tokens |
|-------|----------|---------|-----------|----------------|
| **Llama 3.1 8B** | Local (Ollama) | 128K | Fast, private, free | $0 |
| **Llama 3.1 70B** | Local/Cloud | 128K | Strong reasoning | $0.60 |
| **Mistral Large 2** | Local/Cloud | 128K | Multilingual | $2.00 |
| **CodeLlama 70B** | Local (Ollama) | 16K | Code specialist | $0 |
| **Claude 3.5 Sonnet** | Anthropic | 200K | Best for analysis | $3.00 |
| **Claude 3 Haiku** | Anthropic | 200K | Fast, cheap | $0.25 |
| **GPT-4o** | OpenAI | 128K | Vision, general | $5.00 |
| **GPT-4o-mini** | OpenAI | 128K | Cheap, capable | $0.15 |
| **o1-preview** | OpenAI | 128K | Complex reasoning | $15.00 |

#### 3.3 Fine-tuning & Custom Models

- **Personalization Training**: Fine-tune on user's conversation history
- **Domain Adaptation**: Upload documents to create specialized models
- **Skill-specific Models**: Train models for specific skill execution
- **Model Evaluation**: A/B testing different models for your use case

---

### Feature 4: Enhanced Memory System

#### 4.1 Neural Memory Graph

```
┌─────────────────────────────────────────────────────────────────────────┐
│  Memory Explorer                                                        │
├─────────────────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────────────────────────────────────────┐ │
│  │             │  │  🔍 Search: "Q4 budget meeting"                 │ │
│  │  VIEWS      │  │  [Graph] [Timeline] [List] [Map]                │ │
│  │             │  │                                                  │ │
│  │  📊 Graph   │  │  ┌─────────────────────────────────────────┐     │ │
│  │  📅 Timeline│  │  │                                         │     │ │
│  │  📋 List    │  │  │     [💼 Q4 Budget] ←────→ [👤 Sarah]    │     │ │
│  │  🗺️ Map     │  │  │         ↓                    ↓            │     │ │
│  │             │  │  │    [📈 Analysis] ←────→ [🏢 Board Mtg]  │     │ │
│  │  ───────────│  │  │         ↓                               │     │ │
│  │             │  │  │    [💰 Cloud Costs]                     │     │ │
│  │  FILTERS    │  │  │                                         │     │ │
│  │             │  │  └─────────────────────────────────────────┘     │ │
│  │  👤 People  │  │                                                  │ │
│  │  💼 Projects│  │  Selected: [💼 Q4 Budget]                         │ │
│  │  📅 Events  │  │                                                  │ │
│  │  🏢 Orgs    │  │  Type: Project                                     │ │
│  │  📄 Files   │  │  Created: Nov 1, 2024                            │ │
│  │  🏷️ Tags    │  │  Last Active: 2 days ago                         │ │
│  │             │  │                                                  │ │
│  │  [+ Entity] │  │  Related Entities:                               │ │
│  │             │  │  • Sarah Chen (Finance Director)                 │ │
│  │             │  │  • Board Meeting Nov 15 (Event)                  │ │
│  │             │  │  • Cloud Costs (Topic)                           │ │
│  │             │  │  • budget_q4.xlsx (File)                         │ │
│  │             │  │                                                  │ │
│  │             │  │  [View Details] [Ask About This] [Export]        │ │
│  └─────────────┘  └─────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────┘
```

#### 4.2 Memory Features

| Feature | Description | Benefit |
|---------|-------------|---------|
| **Entity Extraction** | Auto-identify people, projects, topics from conversations | No manual tagging |
| **Relationship Mapping** | Track how entities connect (worked_on, mentioned_in, blocked_by) | Contextual understanding |
| **Temporal Reasoning** | "What was I working on before vacation?" | Time-based recall |
| **Sentiment Tracking** | Remember emotional context (frustrated, excited, confused) | Empathetic responses |
| **Source Attribution** | Every memory links to source conversation/file | Verifiability |
| **Memory Decay** | Less relevant memories fade, important ones strengthen | Efficient storage |
| **Conflict Resolution** | Detect contradictions and flag for clarification | Accuracy |

#### 4.3 Memory Operations

- **Auto-Remember**: Everything is captured by default
- **Explicit Remember**: "Remember that..." commands
- **Memory Query**: Natural language search
- **Memory Edit**: Correct or update memories
- **Memory Merge**: Combine duplicate entities
- **Memory Export**: JSON, GraphML, or Markdown
- **Memory Import**: Migrate from other systems

---

### Feature 5: Main Chat Interface

#### 5.1 Conversation Layout

```
┌─────────────────────────────────────────────────────────────────────────┐
│  Tentacles                                                [🔍] [👤] [⚙️]│
├─────────────────────────────────────────────────────────────────────────┤
│  ┌──────────┐  ┌────────────────────────────────────────┐  ┌─────────┐ │
│  │          │  │                                        │  │         │ │
│  │ AGENTS   │  │  🤖 General Agent                      │  │ CONTEXT │
│  │          │  │  Hello! I'm ready to help. I can:      │  │         │ │
│  │ 🎯 Gen   │  │                                        │  │ 📁 Files│
│  │ 💻 Code  │  │  • Search your files and notes         │  │ 📊 Data │
│  │ 🔍 Res   │  │  • Execute code in sandbox             │  │ 🧠 Mem  │
│  │ 📝 Write │  │  • Remember our conversations          │  │ 🔧 Tools│
│  │          │  │  • Connect to your tools               │  │         │
│  │ [+ New]  │  │                                        │  │ ─────── │
│  │          │  │  [Start with file] [Search memory]    │  │ Active  │
│  │ ─────────│  │  [Run code] [Browse web]              │  │ Skills: │
│  │          │  │                                        │  │ 📁 🔍 🌐│
│  │ HISTORY  │  │  ─────────────────────────────────    │  │ 💻 📧 📅│
│  │          │  │                                        │  │         │ │
│  │ Today    │  │  👤 You                                │  │ [Manage]│
│  │ • Budget │  │  @Coder analyze the performance       │  │         │ │
│  │ • Docker │  │  issues in the API server              │  │         │ │
│  │          │  │                                        │  │         │ │
│  │ Yesterday│  │  🤖 Coder Agent (activated)            │  │         │ │
│  │ • Meeting│  │  🔍 Searching for API server files...  │  │         │ │
│  │ • Research│ │  📁 Found: /projects/api/                │  │         │ │
│  │          │  │  📄 Analyzing server.js, routes/        │  │         │ │
│  │          │  │                                        │  │         │ │
│  │          │  │  [View Analysis] [Optimize] [Debug]    │  │         │ │
│  │          │  │                                        │  │         │ │
│  │          │  │  ─────────────────────────────────    │  │         │ │
│  │          │  │                                        │  │         │ │
│  │          │  │  🤖 Coder → 🔍 Researcher (handoff)     │  │         │ │
│  │          │  │  Researcher: Gathering best practices  │  │         │ │
│  │          │  │  for Node.js performance optimization │  │         │ │
│  │          │  │                                        │  │         │ │
│  └──────────┘  │                                        │  └─────────┘ │
│                 └────────────────────────────────────────┘              │
├─────────────────────────────────────────────────────────────────────────┤
│  [📎] [🎙️] [🤖 General ▼]  Type your message...           [➤] [⚡]     │
│   Attach  Voice   Agent Selector                            Send  Quick  │
└─────────────────────────────────────────────────────────────────────────┘
```

#### 5.2 Message Types

| Type | Visual | Interactions |
|------|--------|------------|
| **User** | Blue bubble, right | Edit, Copy, Delete |
| **Agent** | Gray bubble, left | Copy, Regenerate, Rate |
| **Agent Switch** | System notification | View agent profile, Configure |
| **Tool Execution** | Expandable card | View logs, Stop, Rerun |
| **Skill Output** | Formatted result | Download, Share, Add to memory |
| **Memory Recall** | "Remembered..." badge | View source, Forget |
| **Code Block** | Syntax highlighted | Copy, Run in sandbox, Explain |
| **File Reference** | File icon + excerpt | Open, Show in folder, Preview |

#### 5.3 Input Features

- **Rich Input**: Markdown, @mentions (agents/files/people), #tags
- **Agent Switching**: `@Coder` mid-conversation switches agent
- **Skill Invocation**: `/search`, `/run`, `/remember`, `/web`
- **Voice Mode**: Push-to-talk, Whisper transcription
- **File Attachments**: Drag-drop, clipboard paste, max 100MB
- **Context Awareness**: Auto-suggests relevant memories/files

---

### Feature 6: Visual Workflow Builder

#### 6.1 Agent Workflow Studio

```
┌─────────────────────────────────────────────────────────────────────────┐
│  Workflow Studio                                    [Test] [Save] [Run] │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌─────────────┐      ┌─────────────┐      ┌─────────────┐             │
│  │   TRIGGER   │      │   PROCESS   │      │   OUTPUT    │             │
│  │             │─────▶│             │─────▶│             │             │
│  │ New Email   │      │ Classify    │      │ Route to    │             │
│  │ Received    │      │ Intent      │      │ Agent       │             │
│  └─────────────┘      └─────────────┘      └──────┬──────┘             │
│                                                   │                     │
│                              ┌────────────────────┼────────────────┐ │
│                              │                    │                    │ │
│                              ▼                    ▼                    │ │
│                        ┌─────────┐          ┌─────────┐                 │ │
│                        │  Sales  │          │ Support │                 │ │
│                        │  Agent  │          │  Agent  │                 │ │
│                        └────┬────┘          └────┬────┘                 │ │
│                             │                    │                        │ │
│                             └────────────────────┘                        │ │
│                                          │                                │ │
│                                          ▼                                │ │
│                                    ┌─────────────┐                         │ │
│                                    │   Archive   │                         │ │
│                                    │   to CRM    │                         │ │
│                                    └─────────────┘                         │ │
│                                                                             │
│  [+ Add Node]  [Add Condition]  [Add Loop]  [Import]  [Export]             │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────┘
```

#### 6.2 Workflow Components

| Node Type | Function | Configuration |
|-----------|----------|---------------|
| **Trigger** | Start workflow | Schedule, Webhook, Event, Manual |
| **Agent** | AI processing | Select agent, prompt template, skills |
| **Condition** | Branching logic | If/else based on content, sentiment |
| **Action** | Execute skill | Choose skill, map inputs/outputs |
| **Delay** | Wait period | Duration or specific time |
| **Aggregate** | Combine results | Merge multiple agent outputs |
| **Notify** | Send alert | Email, Slack, Push notification |
| **Memory** | Store result | Save to graph, tag, categorize |

---

### Feature 7: Dashboard & Analytics

#### 7.1 Main Dashboard

```
┌─────────────────────────────────────────────────────────────────────────┐
│  Dashboard                                          [📊] [⚙️] [?]       │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐   │
│  │   💰 COSTS  │  │   🤖 AGENTS │  │   🧠 MEMORY │  │   ⚡ USAGE  │   │
│  │             │  │             │  │             │  │             │   │
│  │  $12.45     │  │  4 Active   │  │  2,341      │  │  147 tasks  │   │
│  │  Today      │  │  Today      │  │  Entities   │  │  Today      │   │
│  │             │  │             │  │             │  │             │   │
│  │ ↓ 60% vs    │  │ ↑ 2 new     │  │ +23 today   │  │ ↑ 12% vs    │   │
│  │  yesterday  │  │  deployed   │  │             │  │  yesterday  │   │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘   │
│                                                                         │
│  ┌──────────────────────────┐  ┌──────────────────────────┐             │
│  │  Model Usage Breakdown   │  │  Agent Activity          │             │
│  │                          │  │                          │             │
│  │  ████████████ Local 85%  │  │  🎯 General    ████████  │             │
│  │  ██ Cloud 15%            │  │  💻 Coder      ████      │             │
│  │                          │  │  🔍 Researcher ██        │             │
│  │  Saved: $34.50 this week │  │  📝 Writer     █         │             │
│  │                          │  │                          │             │
│  └──────────────────────────┘  └──────────────────────────┘             │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │  Recent Activity                                                │   │
│  │                                                                 │   │
│  │  2:34 PM  🤖 Coder → Analyzed API performance issues            │   │
│  │  2:15 PM  🧠 Remembered: "Sarah prefers morning meetings"       │   │
│  │  1:30 PM  🔧 Skill "GitHub" executed: Created PR #234           │   │
│  │  1:15 PM  💰 Model switched: GPT-4o → Local (cost saving)      │   │
│  │  12:00 PM 🎯 General → Summarized 5 unread emails              │   │
│  │                                                                 │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │  Active Workflows                                               │   │
│  │                                                                 │   │
│  │  🔄 Email Triage    [Running]  12 emails processed today         │   │
│  │  🔄 Daily Standup   [Scheduled] Runs weekdays at 9:00 AM         │   │
│  │  🔄 Code Review     [Paused]   Awaiting GitHub webhook           │   │
│  │                                                                 │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

### Feature 8: Settings & Configuration

#### 8.1 Settings Sections

| Section | Key Options |
|---------|-------------|
| **Account** | Profile, email, password, 2FA, delete account |
| **Agents** | Default agents, custom agent creation, agent permissions |
| **Skills** | Installed skills, skill permissions, marketplace, custom skills |
| **Models** | Routing rules, budget caps, local model management, API keys |
| **Memory** | Retention policies, auto-extract settings, export/import, privacy |
| **Integrations** | Connected services (GitHub, Slack, etc.), OAuth management |
| **Workflows** | Active workflows, triggers, notifications |
| **Security** | Session management, audit log, data retention |
| **Appearance** | Theme, density, font, language, accessibility |
| **Notifications** | Channels, frequency, quiet hours, digest settings |
| **Advanced** | Developer mode, custom endpoints, debugging, logs |

---

## Database Schema (Supabase)

### Core Tables

```sql
-- Users and Profiles
create table public.profiles (
  id uuid references auth.users primary key,
  username text unique,
  full_name text,
  avatar_url text,
  use_case text,
  default_agent_id uuid,
  model_config jsonb default '{}',
  daily_budget_cap decimal(10,2) default 20.00,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- Agents
create table public.agents (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id),
  name text not null,
  description text,
  avatar_url text,
  agent_type text check (agent_type in ('generalist', 'coder', 'researcher', 'writer', 'analyst', 'planner', 'custom')),
  system_prompt text,
  model_config jsonb, -- {primary_model, fallback_model, temperature, max_tokens}
  is_active boolean default true,
  is_default boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Skills
create table public.skills (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id),
  name text not null,
  description text,
  category text check (category in ('system', 'integration', 'data', 'creative', 'ai', 'custom')),
  icon text,
  manifest jsonb, -- Full skill manifest
  is_builtin boolean default false,
  is_enabled boolean default true,
  permissions jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Agent-Skill Relationships
create table public.agent_skills (
  id uuid default gen_random_uuid() primary key,
  agent_id uuid references public.agents(id) on delete cascade,
  skill_id uuid references public.skills(id) on delete cascade,
  config jsonb, -- Skill-specific configuration
  is_enabled boolean default true,
  unique(agent_id, skill_id)
);

-- Conversations
create table public.conversations (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id),
  title text,
  agent_id uuid references public.agents(id),
  model_used text,
  cost_accumulated decimal(10,4) default 0,
  token_count integer default 0,
  message_count integer default 0,
  is_active boolean default true,
  last_message_at timestamp with time zone,
  metadata jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Messages
create table public.messages (
  id uuid default gen_random_uuid() primary key,
  conversation_id uuid references public.conversations(id) on delete cascade,
  role text check (role in ('user', 'assistant', 'system', 'agent_switch')),
  content text,
  agent_id uuid references public.agents(id), -- Null if user or system
  reasoning_chain jsonb,
  tool_calls jsonb,
  skill_executions jsonb,
  model_used text,
  tokens_used integer,
  cost decimal(10,6),
  latency_ms integer,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Memory Graph - Entities
create table public.memory_entities (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id),
  entity_type text check (entity_type in ('person', 'project', 'topic', 'file', 'event', 'decision', 'organization')),
  name text not null,
  description text,
  properties jsonb,
  embedding vector(1536),
  sentiment text,
  importance_score float default 0.5,
  first_seen_at timestamp with time zone,
  last_seen_at timestamp with time zone,
  mention_count integer default 1,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Memory Relationships
create table public.memory_relations (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id),
  source_entity_id uuid references public.memory_entities(id) on delete cascade,
  target_entity_id uuid references public.memory_entities(id) on delete cascade,
  relation_type text, -- 'worked_on', 'mentioned_in', 'blocked_by', 'collaborates_with', etc.
  strength float default 0.5,
  evidence jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Workflows
create table public.workflows (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id),
  name text not null,
  description text,
  definition jsonb, -- Workflow graph definition
  is_active boolean default false,
  trigger_type text check (trigger_type in ('manual', 'schedule', 'webhook', 'event')),
  trigger_config jsonb,
  last_run_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Workflow Runs
create table public.workflow_runs (
  id uuid default gen_random_uuid() primary key,
  workflow_id uuid references public.workflows(id) on delete cascade,
  status text check (status in ('pending', 'running', 'completed', 'failed', 'cancelled')),
  input_data jsonb,
  output_data jsonb,
  logs jsonb,
  started_at timestamp with time zone,
  completed_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Skill Executions (Audit)
create table public.skill_executions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id),
  skill_id uuid references public.skills(id),
  conversation_id uuid references public.conversations(id),
  agent_id uuid references public.agents(id),
  input_params jsonb,
  output_result jsonb,
  execution_time_ms integer,
  status text,
  user_approved boolean,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Model Usage Tracking
create table public.model_usage (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id),
  model_name text,
  provider text, -- 'local', 'openai', 'anthropic', etc.
  tokens_input integer,
  tokens_output integer,
  cost decimal(10,6),
  task_type text,
  latency_ms integer,
  created_at timestamp with time zone default timezone('utc'::text, now())
);
```

---

## API Endpoints

### Authentication
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/auth/magiclink` | POST | Send magic link email |
| `/auth/callback` | GET | Handle OAuth callbacks |
| `/auth/session` | GET | Get current session |

### Agents
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/agents` | GET/POST | List or create agents |
| `/agents/:id` | GET/PUT/DELETE | Manage specific agent |
| `/agents/:id/skills` | GET/POST | Manage agent skills |
| `/agents/:id/activate` | POST | Set as active agent |
| `/agents/:id/chat` | POST | Start conversation with agent |

### Skills
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/skills` | GET/POST | List or create skills |
| `/skills/:id` | GET/PUT/DELETE | Manage skill |
| `/skills/:id/test` | POST | Test skill execution |
| `/skills/marketplace` | GET | Browse community skills |
| `/skills/:id/install` | POST | Install from marketplace |

### Models
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/models` | GET | List available models |
| `/models/config` | GET/PUT | Get/update model routing |
| `/models/usage` | GET | Usage statistics |
| `/models/costs` | GET | Cost breakdown |

### Chat & Conversations
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/conversations` | GET/POST | List or create conversations |
| `/conversations/:id` | GET/DELETE | Manage conversation |
| `/conversations/:id/messages` | GET/POST | Get history, send message |
| `/conversations/:id/stream` | WS | WebSocket for streaming |
| `/conversations/:id/switch-agent` | POST | Change active agent |

### Memory
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/memory/search` | POST | Semantic search |
| `/memory/entities` | GET/POST | List or create entities |
| `/memory/relations` | GET/POST | List or create relations |
| `/memory/graph` | GET | Export graph data |
| `/memory/remember` | POST | Explicitly save memory |
| `/memory/forget` | POST | Remove memory |

### Workflows
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/workflows` | GET/POST | List or create workflows |
| `/workflows/:id` | GET/PUT/DELETE | Manage workflow |
| `/workflows/:id/run` | POST | Execute workflow |
| `/workflows/:id/runs` | GET | Get execution history |

---

## Screen-by-Screen Navigation

| Screen | URL | Purpose |
|--------|-----|---------|
| **Landing** | `/` | Marketing, pricing, signup |
| **Auth** | `/auth` | Login/signup |
| **Onboarding** | `/onboarding` | Setup wizard |
| **Chat** | `/chat` or `/chat/:id` | Main interface |
| **Agents** | `/agents` | Agent management |
| **Agent Detail** | `/agents/:id` | Configure specific agent |
| **Skills** | `/skills` | Skill marketplace & management |
| **Skill Studio** | `/skills/studio` | Create custom skills |
| **Memory** | `/memory` | Memory browser |
| **Memory Graph** | `/memory/graph` | Visual graph view |
| **Workflows** | `/workflows` | Workflow management |
| **Workflow Studio** | `/workflows/studio` | Visual builder |
| **Dashboard** | `/dashboard` | Analytics & overview |
| **Settings** | `/settings/:section` | Configuration |
| **Help** | `/help` | Documentation & support |

---

## Implementation Roadmap

### Phase 1: Foundation (Weeks 1-4)
- [ ] Supabase project setup with all tables
- [ ] React + Vite + Tailwind scaffold
- [ ] Authentication system (magic links + OAuth)
- [ ] Basic chat interface with streaming
- [ ] Agent system (CRUD, basic switching)
- [ ] Conversation persistence

### Phase 2: Intelligence (Weeks 5-8)
- [ ] Model routing system (local + cloud)
- [ ] Ollama integration
- [ ] Skill system foundation (built-in skills)
- [ ] File operations skill
- [ ] Web search skill
- [ ] Code execution sandbox (WASM)

### Phase 3: Memory & Context (Weeks 9-12)
- [ ] Graph memory implementation
- [ ] Entity extraction pipeline
- [ ] Memory browser UI
- [ ] Semantic search (pgvector)
- [ ] Context injection in conversations
- [ ] Memory-based suggestions

### Phase 4: Advanced Features (Weeks 13-16)
- [ ] Visual workflow builder
- [ ] Custom skill builder (no-code + code)
- [ ] Skill marketplace foundation
- [ ] Multi-agent orchestration
- [ ] Agent handoff system
- [ ] Advanced analytics dashboard

### Phase 5: Polish & Scale (Weeks 17-20)
- [ ] Mobile responsive optimization
- [ ] Performance optimization
- [ ] Security audit & hardening
- [ ] Documentation & tutorials
- [ ] Beta testing program
- [ ] Community skill marketplace launch

---

## Branding & Design

### Visual Identity
- **Name**: Tentacles
- **Tagline**: "Many minds, one purpose"
- **Logo**: Abstract octopus/tentacle motif suggesting distributed intelligence
- **Color Palette**:
  - Primary: Deep ocean blue (#0A2540)
  - Secondary: Coral accent (#FF6B6B)
  - Accent: Bioluminescent cyan (#00D9FF)
  - Background: Abyssal dark (#0D1B2A)
  - Surface: Sea foam light (#F0F4F8)

### Design Principles
- **Depth**: Layered UI suggesting depth of intelligence
- **Fluidity**: Smooth animations, organic shapes
- **Clarity**: Despite complexity, interface remains clean
- **Control**: User always feels in command of the system

---

## Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| **Time to First Value** | < 2 minutes | Onboarding completion |
| **Agent Utilization** | 3+ agents per user | Agent deployment stats |
| **Skill Adoption** | 5+ skills per user | Skill installation count |
| **Local vs Cloud Ratio** | 80/20 | Cost optimization |
| **Memory Queries** | 10+ per day | Active memory usage |
| **Workflow Creation** | 1+ per week | Workflow activity |
| **Daily Active Users** | 40% of total | Engagement metric |
| **User Retention** | 70% at 30 days | Cohort analysis |

---

## Competitive Differentiation

| Feature | Tentacles | OpenClaw.ai | OpenAI | Claude | Other |
|---------|-----------|-------------|--------|--------|-------|
| Multi-Agent | ✅ Native | ❌ Single | ❌ Single | ❌ Single | Rare |
| Skill System | ✅ Modular | ✅ Fixed | ❌ Plugins | ❌ Tools | Varies |
| Visual Workflows | ✅ Built-in | ❌ Code | ❌ No | ❌ No | Rare |
| Local-First | ✅ Core | ✅ Yes | ❌ No | ❌ No | Some |
| Graph Memory | ✅ Neural | ✅ Basic | ❌ Vector | ❌ Vector | Rare |
| Cost Control | ✅ Intelligent | ✅ Basic | ❌ Manual | ❌ Manual | Rare |
| Sandboxed Execution | ✅ WASM | ⚠️ Node | ❌ Full OS | ❌ Full OS | Varies |
| Open Source | ✅ Core | ✅ Yes | ❌ No | ❌ No | Some |

---

## Risk Mitigation

| Risk | Mitigation |
|------|------------|
| **Local LLM Performance** | Intelligent fallback to cloud for complex tasks |
| **Security Concerns** | WASM sandboxing, permission system, audit logs |
| **Cost Overruns** | Hard budget caps, usage alerts, auto-downgrade |
| **Complexity Overwhelm** | Progressive disclosure, templates, onboarding |
| **Data Privacy** | Local-first architecture, encryption, zero-knowledge |
| **Vendor Lock-in** | Open source core, exportable data, standard formats |

---

## Appendix: User Personas

### Persona 1: "Developer Dana"
- **Uses**: Coder Agent, GitHub Skill, Code Executor
- **Workflow**: Auto-code review, bug analysis, documentation generation
- **Values**: Privacy, speed, accuracy

### Persona 2: "Manager Mike"
- **Uses**: Planner Agent, Email Skill, Calendar Skill
- **Workflow**: Email triage, meeting prep, project tracking
- **Values**: Time savings, organization, delegation

### Persona 3: "Researcher Rachel"
- **Uses**: Researcher Agent, Web Search, Data Skills
- **Workflow**: Literature review, data synthesis, report writing
- **Values**: Comprehensiveness, accuracy, citation tracking

### Persona 4: "Creator Chris"
- **Uses**: Writer Agent, Image Gen Skill, Workflow Builder
- **Workflow**: Content creation, image generation, publishing pipeline
- **Values**: Creativity, quality, efficiency

---

**Document Version**: 1.0  
**Product Name**: Tentacles  
**Last Updated**: 2024  
**Status**: Ready for Development

---


