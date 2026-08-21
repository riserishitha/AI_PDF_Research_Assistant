# 📚 AI PDF Research Assistant

An AI-powered document intelligence platform that enables users to upload PDF documents, organize them into projects, and interact with them using natural language through Retrieval-Augmented Generation (RAG).

The application extracts text from uploaded PDFs, generates semantic embeddings, retrieves relevant document chunks, and uses a Large Language Model (LLM) to answer user questions accurately.

---

# 🚀 Project Overview

The AI PDF Research Assistant helps users transform static PDF documents into an interactive knowledge base.

Whether it's research papers, resumes, technical documentation, manuals, reports, or academic notes, users can upload documents and receive AI-powered answers grounded in the uploaded content.

This project demonstrates how enterprise AI assistants such as ChatGPT with custom documents, Notion AI, and Microsoft Copilot are built.

---

# ✨ Features

## Authentication

- User Registration
- Secure Login
- JWT Authentication
- Protected Routes
- Logout

---

## Project Management

- Create Projects
- View Projects
- Delete Projects
- Search Projects
- Project Dashboard

---

## Document Management

- Upload PDF Documents
- Automatic PDF Text Extraction
- Chunking Documents
- Generate Semantic Embeddings
- View Uploaded Documents
- Delete Documents

---

## AI Chat

- Ask Questions About Uploaded PDFs
- Retrieval-Augmented Generation (RAG)
- Context-Aware Responses
- Semantic Search
- Chat History
- Multiple Questions Per Project

## 🤖 AI Capabilities

## Dashboard

- Modern Dashboard UI
- Project Statistics
- Search Projects
- Professional Workspace Design

---

# 🏗️ System Architecture

```
                    Browser

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

             React + TypeScript Frontend

                        │

                Axios REST API Calls

The core intelligence of the application is based on **Retrieval-Augmented Generation (RAG)**.

                        ▼

                 FastAPI Backend

```text
                    PDF Upload
                        │

        ┌───────────────┼────────────────┐

        ▼               ▼                ▼

   PostgreSQL      PDF Processing      JWT Auth

        │               │

        ▼               ▼

 Document Metadata   Extract Text

                        │
                        ▼

                  Chunking Service

                        │

                        ▼

               Embedding Generation

                        │
                        ▼

                Vector Similarity Search

                        │

                        ▼

                Gemini / LLM Service

                        │

                        ▼

                 AI Generated Answer
```

---

# 🛠️ Tech Stack

## Frontend

- React 19
- TypeScript
- Vite
- React Router
- Axios
- Tailwind CSS
- Lucide React
- React Hooks

---

## Backend

- FastAPI
- Python
- SQLAlchemy
- Alembic
- Pydantic
- Uvicorn

---

## Database

### PostgreSQL

PostgreSQL stores application-level structured data such as:

- Users
- Projects
- Documents
- Document Chunks
- Chat History

---

## AI & NLP

- Sentence Transformers
- all-MiniLM-L6-v2 Embedding Model
- Semantic Similarity Search
- Retrieval-Augmented Generation (RAG)

---

## PDF Processing

- PyPDF2
- PDF Text Extraction
- Text Cleaning
- Document Chunking

---

## Authentication

- JWT Authentication
- OAuth2 Password Flow
- Password Hashing (bcrypt)

---

## API Communication

- REST APIs
- JSON
- Axios

---

## Development Tools

- Git
- GitHub
- VS Code
- Postman
- Swagger UI

---

# 📂 Project Structure

```
AI-PDF-Research-Assistant/

│
├── frontend/
│   ├── src/
│   │
│   ├── api/
│   ├── components/
│   ├── pages/
│   ├── project/
│   ├── services/
│   ├── types/
│   ├── utils/
│   └── App.tsx
│
├── backend/
│   ├── app/
│   │
│   ├── api/
│   ├── core/
│   ├── crud/
│   ├── database/
│   ├── models/
│   ├── schemas/
│   ├── services/
│   ├── uploads/
│   └── main.py
│
├── README.md
└── requirements.txt
```

---

# ⚙️ Backend Workflow

```
Upload PDF

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

Store in PostgreSQL

        │

        ▼

Retrieve Relevant Chunks

        │

        ▼

Send Context to LLM

        │

        ▼

Generate AI Response
```

---

# 💬 Chat Flow

```
User Question

      │

      ▼

Generate Question Embedding

      │

      ▼

Similarity Search

      │

      ▼

Retrieve Relevant Chunks

      │

      ▼

Create Context

      │

      ▼

Gemini API

      │

      ▼

AI Answer

      │

      ▼

Save Chat History
```

---

# 📖 Database Tables

- Users
- Projects
- Documents
- DocumentChunks
- Chats

---

# 📌 API Endpoints

## Authentication

- POST `/api/v1/auth/register`
- POST `/api/v1/auth/login`

---

## Projects

- GET `/api/v1/projects`
- POST `/api/v1/projects`
- DELETE `/api/v1/projects/{id}`

---

## Documents

- POST `/api/v1/documents/upload/{projectId}`
- GET `/api/v1/documents/project/{projectId}`
- DELETE `/api/v1/documents/{id}`

---

## Chat

- POST `/api/v1/chat/{projectId}`
- GET `/api/v1/chat/{projectId}/history`

---

## Search

- POST `/api/v1/search/{projectId}`

---

# 🧠 AI Concepts Used

- Artificial Intelligence
- Large Language Models (LLMs)
- Retrieval-Augmented Generation (RAG)
- Semantic Search
- Vector Embeddings
- Cosine Similarity
- Prompt Engineering
- Context Injection
- Document Chunking

---

# 🎯 Learning Outcomes

After completing this project, you'll understand:

- Full-Stack AI Application Development
- FastAPI REST API Design
- React + TypeScript Development
- JWT Authentication
- PostgreSQL Database Design
- PDF Parsing
- Semantic Search
- Embedding Models
- Retrieval-Augmented Generation (RAG)
- LLM Integration
- AI System Architecture

---

# 🚀 Future Enhancements

- Google Authentication
- OCR Support for Scanned PDFs
- Drag-and-Drop Upload
- AI Generated Document Summaries
- Streaming AI Responses
- Multi-PDF Chat
- Citation Support
- Export Chat as PDF
- Dark Mode
- User Profiles
- Team Collaboration
- Qdrant Vector Database
- LangChain Integration
- Docker Deployment
- AWS S3 / MinIO Storage
- OpenAI / Claude Support
- Ollama Local LLM Support

---

# 🖥️ Getting Started

## Prerequisites

- Python 3.11+
- Node.js 20+
- PostgreSQL
- Git

---

## Clone the Repository

```bash
git clone https://github.com/your-username/AI-PDF-Research-Assistant.git

cd AI-PDF-Research-Assistant
```

---

# ⚡ Backend Setup

Navigate to the backend folder:

```bash
cd backend
```

Create a virtual environment:

```bash
python -m venv venv
```

Activate the virtual environment:

### Windows

```bash
venv\Scripts\activate
```

### macOS/Linux

```bash
source venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Configure environment variables by creating a `.env` file:

```env
DATABASE_URL=postgresql://username:password@localhost:5432/ai_research
SECRET_KEY=your_secret_key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60
GEMINI_API_KEY=your_gemini_api_key
```

Run database migrations:

```bash
alembic upgrade head
```

Start the backend server:

```bash
python -m uvicorn app.main:app --reload
```

Backend runs at:

```
http://localhost:8000
```

Swagger Documentation:

```
http://localhost:8000/docs
```

---

# 💻 Frontend Setup

Navigate to the frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---

# 📷 Application Workflow

1. Register a new account.
2. Log in securely.
3. Create a new project.
4. Upload one or more PDF documents.
5. The system extracts text and generates embeddings.
6. Ask questions related to the uploaded documents.
7. Receive AI-generated answers with contextual understanding.
8. View previous chat history.
9. Manage projects and documents.
