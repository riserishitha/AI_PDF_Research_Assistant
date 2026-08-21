# 📚 AI Research Assistant

> **A production-style RAG application for uploading documents, understanding their content, and asking questions using natural language.**

The **AI Research Assistant** is a full-stack AI application that allows users to upload PDF documents and interact with them through an intelligent conversational interface.

The project is designed not only to build a functional application, but also to understand **how modern AI-powered knowledge assistants work internally** — from authentication and document ingestion to embeddings, vector search, retrieval, prompt construction, and LLM-generated responses.

---

## 🎯 Project Vision

Build a production-oriented AI research assistant that demonstrates how systems such as document chat assistants, enterprise knowledge bases, and custom-document AI tools are architected.

### What this project will teach

- Full-stack application development
- Modern React/Next.js architecture
- REST API development with FastAPI
- PostgreSQL database design
- Authentication and authorization
- PDF processing and text extraction
- Document chunking and metadata management
- Embeddings and semantic search
- Vector databases
- Retrieval-Augmented Generation (RAG)
- LLM integration
- Conversational AI
- Streaming responses
- Docker and containerization
- Production deployment concepts
- AI application architecture

---

# 🚀 Core Features

## 👤 User Management

- User registration and login
- Secure authentication
- Protected routes
- User profile
- User-specific documents and conversations
- Session management

## 📄 Document Management

- Upload PDF documents
- Multiple document support
- View uploaded documents
- Document metadata
- Delete documents
- Document processing status
- Search and filter documents

## 🤖 AI Capabilities

- Chat with uploaded documents
- Ask questions about document content
- Generate document summaries
- Context-aware responses
- Semantic document search
- Source/reference retrieval
- Conversation history
- Streaming AI responses
- Markdown-formatted answers

## ⚙️ Production Features

- Responsive UI
- Dark mode
- Loading states
- Error handling
- API validation
- Environment-based configuration
- Database migrations
- Dockerized services
- Deployment-ready architecture

---

# 🏗️ System Architecture

```text
                         ┌──────────────────────┐
                         │      Browser         │
                         │   Next.js / React    │
                         └──────────┬───────────┘
                                    │
                                    │ REST API
                                    ▼
                         ┌──────────────────────┐
                         │       FastAPI        │
                         │      Backend         │
                         └──────────┬───────────┘
                                    │
                 ┌──────────────────┼──────────────────┐
                 │                  │                  │
                 ▼                  ▼                  ▼
        ┌────────────────┐  ┌────────────────┐  ┌────────────────┐
        │  PostgreSQL    │  │   AI / RAG     │  │ Object Storage │
        │                │  │    Pipeline    │  │                │
        │ Users          │  │ LangChain      │  │ PDF Files      │
        │ Documents      │  │ Embeddings     │  │ MinIO / S3     │
        │ Chats          │  │ Retrieval      │  │                │
        │ Messages       │  │ Prompting      │  │                │
        └────────────────┘  └───────┬────────┘  └────────────────┘
                                    │
                                    ▼
                           ┌──────────────────┐
                           │      Qdrant      │
                           │  Vector Database │
                           └────────┬─────────┘
                                    │
                                    ▼
                           ┌──────────────────┐
                           │       LLM        │
                           │ Gemini / OpenAI  │
                           └──────────────────┘
```

---

# 🔄 RAG Pipeline

The core intelligence of the application is based on **Retrieval-Augmented Generation (RAG)**.

Instead of sending an entire PDF directly to an LLM, the application first processes the document and retrieves only the most relevant information.

```text
                    PDF Upload
                        │
                        ▼
                 Extract Text
                        │
                        ▼
                  Clean Text
                        │
                        ▼
                 Split into Chunks
                        │
                        ▼
                 Generate Embeddings
                        │
                        ▼
                  Store in Qdrant
                        │
                        │
             ┌──────────┴──────────┐
             │                     │
             ▼                     │
       User Question               │
             │                     │
             ▼                     │
      Generate Query Embedding     │
             │                     │
             ▼                     │
       Semantic Search ────────────┘
             │
             ▼
       Relevant Chunks
             │
             ▼
      Build Context Prompt
             │
             ▼
             LLM
             │
             ▼
       Generated Answer
             │
             ▼
      Sources / References
```

### Why RAG?

Traditional LLM applications can struggle when the required information is outside the model's training data or when the user wants answers grounded in private documents.

RAG solves this by combining:

**Retrieval + Context + Generation**

The model receives relevant document content at query time and generates an answer based on that retrieved context.

---

# 🛠️ Technology Stack

## Frontend

| Technology | Purpose |
|---|---|
| **Next.js** | React framework and application architecture |
| **React** | UI development |
| **TypeScript** | Type-safe frontend development |
| **Tailwind CSS** | Styling |
| **shadcn/ui** | Reusable UI components |
| **React Query** | Server-state management |
| **Axios** | HTTP client |

### Why Next.js?

This project uses Next.js to learn:

- Modern React architecture
- Routing
- Layouts
- Server and client components
- API integration
- Production-oriented frontend patterns

---

## Backend

| Technology | Purpose |
|---|---|
| **FastAPI** | REST API framework |
| **Python** | Backend and AI development |
| **SQLAlchemy** | ORM |
| **Alembic** | Database migrations |
| **Pydantic** | Data validation |

### Why FastAPI?

FastAPI is well suited for AI applications because it provides:

- High-performance APIs
- Async support
- Automatic OpenAPI documentation
- Strong request/response validation
- Excellent Python ecosystem integration

---

## Database

### PostgreSQL

PostgreSQL stores application-level structured data such as:

- Users
- Documents
- Chats
- Messages
- Document metadata
- User settings
- Processing status

Example relationship:

```text
User
 │
 ├── Documents
 │      │
 │      └── Document Chunks → Qdrant
 │
 └── Chats
        │
        └── Messages
```

---

## Vector Database

### Qdrant

Qdrant stores vector embeddings generated from document chunks.

Instead of relying only on keyword matching, vector search allows the application to retrieve content based on **semantic similarity**.

Example:

```text
Question:
"How does the company handle employee leave?"

Relevant document:
"Employees are entitled to 20 days of annual paid vacation..."
```

Even though the words are not identical, their meanings are related.

---

## AI Framework

### LangChain

LangChain will be used for common RAG and LLM application components:

- Document loaders
- Text splitters
- Prompt templates
- Retrievers
- Model integration
- Output parsing
- RAG chains

> The project will also emphasize understanding the underlying concepts rather than treating LangChain as a black box.

---

## Large Language Model

### Initial Model

**Google Gemini API**

Future support may include:

- OpenAI models
- Anthropic Claude
- Local models
- Ollama

The application should eventually use a model abstraction layer so that the LLM provider can be changed without rewriting the entire application.

---

## Authentication

### Clerk

Clerk will initially handle:

- User registration
- Login
- Logout
- Session management
- Social authentication
- Protected routes

---

## Object Storage

### MinIO

MinIO will be used for storing uploaded PDF files.

```text
User
 │
 ▼
Upload PDF
 │
 ▼
MinIO / S3-compatible storage
 │
 └── Original PDF
```

This keeps binary files separate from PostgreSQL while PostgreSQL stores document metadata.

---

## Deployment

### Development

- Docker
- Docker Compose
- Environment variables

### Future Deployment Options

- Railway
- Render
- AWS
- Other cloud platforms

The architecture will keep application configuration environment-based so that local and production deployments can use different infrastructure without changing application code.

---

# 📂 Project Structure

```text
AI-Research-Assistant/
│
├── frontend/
│   ├── app/
│   ├── components/
│   ├── hooks/
│   ├── lib/
│   ├── services/
│   └── types/
│
├── backend/
│   ├── app/
│   │   ├── api/
│   │   ├── core/
│   │   ├── db/
│   │   ├── models/
│   │   ├── schemas/
│   │   ├── services/
│   │   ├── rag/
│   │   └── main.py
│   │
│   ├── tests/
│   └── requirements.txt
│
├── docker/
│   └── docker-compose.yml
│
├── database/
│   └── migrations/
│
├── docs/
│   ├── architecture/
│   ├── api/
│   └── ai-concepts/
│
├── assets/
│
├── .env.example
├── .gitignore
└── README.md
```

---

# 🗄️ Database Design

The initial relational database will contain the following entities:

```text
┌──────────────┐
│    Users     │
└──────┬───────┘
       │
       │ 1:N
       ▼
┌──────────────┐
│  Documents   │
└──────┬───────┘
       │
       │ 1:N
       ▼
┌──────────────┐
│ Document     │
│ Metadata     │
└──────────────┘


┌──────────────┐
│    Users     │
└──────┬───────┘
       │
       │ 1:N
       ▼
┌──────────────┐
│    Chats     │
└──────┬───────┘
       │
       │ 1:N
       ▼
┌──────────────┐
│   Messages   │
└──────────────┘
```

Qdrant will separately contain the vector representation of document chunks.

---

# 🔐 Security Model

The application will follow a user-isolated data model.

```text
Authenticated User
        │
        ▼
   Authorization
        │
        ▼
User-specific resources
        │
 ┌──────┼───────┐
 ▼      ▼       ▼
Docs   Chats   Profile
```

Important security considerations:

- Authentication on protected endpoints
- Authorization checks for resources
- User-level document isolation
- Secure environment variables
- API validation
- File upload validation
- Controlled file types and sizes
- Secrets excluded from Git
- Production HTTPS
- Safe error responses

---

# 📅 Development Roadmap

## Phase 0 — Planning & Architecture

**Goal:** Understand the system before implementing it.

### Topics

- Application architecture
- Database design
- API design
- RAG architecture
- UI planning
- Folder structure

### Deliverables

- Architecture diagram
- Database schema
- API specification
- UI wireframes
- Project structure

**Status:** 🟡 Not Started

---

## Phase 1 — Frontend Foundation

### Topics

- Next.js
- React
- TypeScript
- Routing
- Layouts
- Components
- Tailwind CSS
- shadcn/ui

### Deliverables

- Landing page
- Login page
- Dashboard
- Document upload interface
- Document list
- Chat interface

**Status:** ⚪ Pending

---

## Phase 2 — Backend Foundation

### Topics

- FastAPI
- REST APIs
- Routers
- Dependency injection
- Request validation
- Response models
- Async APIs
- API documentation

### Deliverables

- FastAPI server
- Health-check endpoint
- API routers
- CRUD APIs
- OpenAPI documentation

**Status:** ⚪ Pending

---

## Phase 3 — PostgreSQL

### Topics

- Relational database design
- SQL
- PostgreSQL
- SQLAlchemy
- Alembic
- Relationships
- Transactions
- Indexes

### Initial Tables

- Users
- Documents
- Chats
- Messages

**Status:** ⚪ Pending

---

## Phase 4 — Authentication

### Topics

- Clerk
- Authentication
- Authorization
- Sessions
- Protected routes
- User identity

### Deliverables

- Signup
- Login
- Logout
- Protected dashboard
- Authenticated API requests

**Status:** ⚪ Pending

---

## Phase 5 — Document Processing

### Topics

- PDF parsing
- Text extraction
- Text cleaning
- Chunking
- Metadata
- File validation
- Object storage

### Pipeline

```text
PDF
 │
 ▼
Extract Text
 │
 ▼
Clean Text
 │
 ▼
Split into Chunks
 │
 ▼
Attach Metadata
 │
 ▼
Store / Index
```

**Status:** ⚪ Pending

---

## Phase 6 — Embeddings

### Topics

- What are embeddings?
- Vector representations
- Embedding models
- Cosine similarity
- Semantic similarity
- Vector indexing

### Pipeline

```text
Text Chunk
    │
    ▼
Embedding Model
    │
    ▼
Vector
    │
    ▼
Qdrant
```

**Status:** ⚪ Pending

---

## Phase 7 — RAG Implementation

### Topics

- Vector search
- Retrieval
- Top-K results
- Prompt templates
- Context injection
- Grounded generation
- Retrieval quality

### Query Flow

```text
User Question
      │
      ▼
Query Embedding
      │
      ▼
Qdrant Similarity Search
      │
      ▼
Top-K Relevant Chunks
      │
      ▼
Context Construction
      │
      ▼
Prompt
      │
      ▼
LLM
      │
      ▼
Answer
```

**Status:** ⚪ Pending

---

## Phase 8 — Chat System

### Topics

- Conversation state
- Chat history
- Message persistence
- Streaming responses
- Markdown rendering
- Source references

### Deliverables

- AI chat
- Chat history
- Streaming responses
- Document references

**Status:** ⚪ Pending

---

## Phase 9 — Production Features

### Features

- Multiple document collections
- Search
- Filters
- Dark mode
- Responsive design
- Loading states
- Error boundaries
- Retry mechanisms
- Empty states
- File validation
- Observability basics

**Status:** ⚪ Pending

---

## Phase 10 — Deployment

### Topics

- Docker
- Docker Compose
- Environment variables
- Production configuration
- Database migrations
- Cloud deployment
- Logging
- Monitoring

**Status:** ⚪ Pending

---

# 🧠 AI Concepts We'll Learn

## 1. AI Fundamentals

- Artificial Intelligence
- Machine Learning
- Deep Learning
- Generative AI
- Large Language Models

---

## 2. LLM Fundamentals

- Tokens
- Context windows
- Temperature
- System prompts
- User prompts
- Model parameters
- Hallucinations
- Inference

---

## 3. Prompt Engineering

Learn how prompts influence model behavior:

```text
System Instructions
        +
User Question
        +
Retrieved Context
        ↓
       LLM
        ↓
    Response
```

---

## 4. Embeddings

Understand how text can be represented numerically.

```text
"Machine learning is useful"
              │
              ▼
       Embedding Model
              │
              ▼
[0.12, -0.44, 0.81, ...]
```

Topics:

- Vector representation
- Semantic similarity
- Cosine similarity
- Embedding dimensions
- Embedding models

---

## 5. Vector Search

Understand how vector databases retrieve semantically related content.

Topics:

- Similarity search
- Top-K retrieval
- Distance metrics
- Vector indexes
- Metadata filtering

---

## 6. Retrieval-Augmented Generation

RAG combines retrieval with generation.

```text
        Knowledge Base
              │
              ▼
         Retrieval
              │
              ▼
       Relevant Context
              │
              ▼
        LLM Generation
              │
              ▼
           Answer
```

Topics:

- Document chunking
- Retrieval
- Context construction
- Prompt construction
- Grounding
- Source attribution
- Retrieval quality

---

## 7. LangChain

Learn:

- Document loaders
- Text splitters
- Prompt templates
- Retrievers
- Chains
- Output parsers
- Model integrations

The objective is to understand the concepts behind each component instead of depending entirely on framework abstractions.

---

# 🆚 PostgreSQL vs Qdrant

The project intentionally uses both a relational database and a vector database.

| Requirement | PostgreSQL | Qdrant |
|---|---|---|
| User records | ✅ | ❌ |
| Chat records | ✅ | ❌ |
| Messages | ✅ | ❌ |
| Document metadata | ✅ | ❌ |
| Text relationships | ✅ | ❌ |
| Embeddings | ❌ | ✅ |
| Semantic search | ❌ | ✅ |
| Vector similarity | ❌ | ✅ |
| Structured queries | ✅ | Limited |

### Simple rule

**PostgreSQL answers:**  
> "What data belongs to this user?"

**Qdrant answers:**  
> "Which document chunks are most similar to this question?"

---

# 🔌 API Design

The backend will expose REST APIs similar to:

```text
Authentication
──────────────
POST   /api/auth/...

Documents
─────────
POST   /api/documents
GET    /api/documents
GET    /api/documents/{id}
DELETE /api/documents/{id}

Chat
────
POST   /api/chats
GET    /api/chats
GET    /api/chats/{id}
POST   /api/chats/{id}/messages

AI
──
POST   /api/ask
POST   /api/documents/{id}/summarize

Health
──────
GET    /health
```

The exact API contract will be finalized during **Phase 0**.

---

# 🌱 Environment Variables

A `.env.example` file will document required configuration without exposing real secrets.

Example:

```env
# Application
APP_ENV=development
API_HOST=0.0.0.0
API_PORT=8000

# PostgreSQL
DATABASE_URL=

# Qdrant
QDRANT_URL=
QDRANT_API_KEY=

# Object Storage
MINIO_ENDPOINT=
MINIO_ACCESS_KEY=
MINIO_SECRET_KEY=
MINIO_BUCKET=

# Authentication
CLERK_SECRET_KEY=

# LLM
GEMINI_API_KEY=
```

> Never commit real API keys, passwords, tokens, or secrets to Git.

---

# 🧪 Testing Strategy

Testing will be introduced throughout development instead of being left until the end.

### Backend

- Unit tests
- API tests
- Validation tests
- Authentication tests
- RAG pipeline tests

### Frontend

- Component tests
- UI interaction tests
- API integration tests

### AI/RAG

- Retrieval tests
- Context relevance checks
- Answer grounding checks
- Regression test questions

---

# 📊 Future Improvements

Once the core application is working, the project can evolve into a more advanced AI platform.

### RAG Improvements

- Hybrid search
- Reranking
- Query rewriting
- Metadata filtering
- Multi-query retrieval
- Parent-child retrieval
- Better chunking strategies

### AI Improvements

- Multiple LLM providers
- Local LLM support
- Agentic workflows
- Structured outputs
- Tool calling
- Citation generation

### Platform Improvements

- Document collections
- Team workspaces
- Role-based access control
- Usage analytics
- Background processing
- Job queues
- Observability
- Rate limiting

---

# 🎓 Learning Outcomes

By completing this project, I will understand how to build an AI application from the ground up.

### Software Engineering

- Frontend architecture
- Backend architecture
- REST APIs
- Authentication
- Database design
- API validation
- Testing
- Deployment

### Data & AI

- PDF processing
- Text preprocessing
- Embeddings
- Vector databases
- Semantic search
- RAG
- Prompt engineering
- LLM integration
- Retrieval evaluation

### Infrastructure

- Docker
- Docker Compose
- Environment configuration
- Object storage
- Database migrations
- Cloud deployment concepts

---

# 🗺️ Project Milestones

```text
Planning
   │
   ▼
Frontend
   │
   ▼
Backend
   │
   ▼
PostgreSQL
   │
   ▼
Authentication
   │
   ▼
PDF Processing
   │
   ▼
Embeddings
   │
   ▼
Qdrant
   │
   ▼
RAG
   │
   ▼
Chat
   │
   ▼
Production Features
   │
   ▼
Deployment
```

---

# 📌 Current Status

**Project:** AI Research Assistant

**Stage:** 🟡 Planning

**Primary Goal:** Build and understand a complete production-style RAG application from the ground up.

### Current focus

- [ ] Finalize architecture
- [ ] Design PostgreSQL schema
- [ ] Define API contracts
- [ ] Plan frontend pages
- [ ] Set up repository structure
- [ ] Define development environment
- [ ] Start Phase 1

---

# 📚 Documentation

Project documentation will be maintained under:

```text
docs/
├── architecture/
├── api/
└── ai-concepts/
```

Planned documentation includes:

- Architecture decisions
- Database schema
- API documentation
- RAG explanations
- Embedding experiments
- Retrieval experiments
- Deployment notes
- Troubleshooting guides

---

# 🚧 Project Philosophy

This project is intentionally built as a **learning-first production-style application**.

The goal is not simply:

> "Make an AI chatbot."

The goal is to understand:

> **How does an AI system ingest knowledge, retrieve relevant information, provide context to an LLM, generate an answer, and deliver that answer through a scalable full-stack application?**

Every major technology should be understood at both the **conceptual** and **implementation** level.

---

# ⭐ End Goal

The final application should provide a seamless experience:

```text
Upload a PDF
      ↓
Process the document
      ↓
Create embeddings
      ↓
Index document chunks
      ↓
Ask a question
      ↓
Retrieve relevant information
      ↓
Send grounded context to the LLM
      ↓
Generate an answer
      ↓
Show the answer with references
```

The result will be a complete **AI Research Assistant** demonstrating modern full-stack development, RAG architecture, vector search, LLM integration, authentication, databases, and deployment concepts.

---

## 📜 License

This project is intended for learning, experimentation, and portfolio development.
