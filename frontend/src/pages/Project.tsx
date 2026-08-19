import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
  ArrowLeft,
  BrainCircuit,
  FileText,
  MessageSquare,
  Sparkles,
  Upload,
  CheckCircle2,
} from "lucide-react";

import Layout from "../components/layout/Layout";
import Header from "../components/layout/Header";

import UploadSection from "../project/UploadSection";
import DocumentList from "../project/DocumentList";
import PDFViewer from "../project/PDFViewer";
import ChatBox from "../project/ChatBox";
import ChatInput from "../project/ChatInput";

import { getDocuments } from "../services/documentService";

import {
  streamQuestion,
  getChatHistory,
} from "../services/chatService";

import type { Document } from "../types/document";
import type { Message } from "../types/chat";

export default function Project() {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const [documents, setDocuments] = useState<Document[]>([]);
  const [selectedDocument, setSelectedDocument] =
    useState<Document | null>(null);

  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!projectId) return;

    loadDocuments();
    loadChatHistory();

    setSelectedDocument(null);
  }, [projectId]);

  async function loadDocuments() {
    if (!projectId) return;

    try {
      const data = await getDocuments(projectId);

      setDocuments(data);

      if (selectedDocument) {
        const exists = data.some(
          (doc) => doc.id === selectedDocument.id
        );

        if (!exists) {
          setSelectedDocument(null);
        }
      }
    } catch (err) {
      console.error("Failed to load documents:", err);
    }
  }

  async function loadChatHistory() {
    if (!projectId) return;

    try {
      const history = await getChatHistory(projectId);

      const formattedMessages: Message[] = [];

      history.forEach((chat) => {
        formattedMessages.push({
          id: crypto.randomUUID(),
          role: "user",
          content: chat.question,
        });

        formattedMessages.push({
          id: crypto.randomUUID(),
          role: "assistant",
          content: chat.answer,
        });
      });

      setMessages(formattedMessages);
    } catch (err) {
      console.error("Failed to load chat history:", err);
    }
  }

  async function handleSend(question: string) {
    if (!projectId || loading) return;

    const trimmedQuestion = question.trim();

    if (!trimmedQuestion) return;

    setLoading(true);

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: trimmedQuestion,
    };

    const assistantId = crypto.randomUUID();

    const assistantMessage: Message = {
      id: assistantId,
      role: "assistant",
      content: "",
      loading: true,
    };

    setMessages((prev) => [
      ...prev,
      userMessage,
      assistantMessage,
    ]);

    try {
      await streamQuestion(
        projectId,
        trimmedQuestion,
        (chunk) => {
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === assistantId
                ? {
                    ...msg,
                    content: msg.content + chunk,
                  }
                : msg
            )
          );
        }
      );

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantId
            ? {
                ...msg,
                loading: false,
              }
            : msg
        )
      );
    } catch (err) {
      console.error("Streaming failed:", err);

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantId
            ? {
                ...msg,
                loading: false,
                content:
                  "Sorry, I couldn't generate an answer. Please try again.",
              }
            : msg
        )
      );
    } finally {
      setLoading(false);
    }
  }

  function getDocumentUrl(document: Document) {
    const baseUrl = "http://127.0.0.1:8000";

    return `${baseUrl}/${document.file_path
      .replace(/\\/g, "/")
      .replace(/^\/+/, "")}`;
  }

  return (
    <Layout>
      <Header />

      <main className="min-h-screen bg-[#f8fafc]">

        {/* =====================================================
            TOP HEADER
        ===================================================== */}

        <section className="border-b border-slate-200 bg-white">

          <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 py-5">

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">

              {/* LEFT */}

              <div className="flex items-center gap-4">

                <button
                  onClick={() => navigate("/dashboard")}
                  className="
                    w-10
                    h-10
                    rounded-xl
                    border
                    border-slate-200
                    bg-white
                    flex
                    items-center
                    justify-center
                    text-slate-500
                    hover:text-slate-900
                    hover:bg-slate-50
                    transition
                  "
                >
                  <ArrowLeft size={18} />
                </button>

                <div
                  className="
                    w-11
                    h-11
                    rounded-xl
                    bg-blue-600
                    flex
                    items-center
                    justify-center
                    text-white
                    shadow-lg
                    shadow-blue-600/20
                  "
                >
                  <BrainCircuit size={22} />
                </div>

                <div>

                  <div className="flex items-center gap-2">

                    <h1 className="text-xl font-bold text-slate-900">
                      AI Research Workspace
                    </h1>

                    <span
                      className="
                        hidden
                        sm:inline-flex
                        items-center
                        gap-1.5
                        px-2
                        py-1
                        rounded-full
                        bg-emerald-50
                        border
                        border-emerald-100
                        text-emerald-700
                        text-[11px]
                        font-semibold
                      "
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      Ready
                    </span>

                  </div>

                  <p className="text-sm text-slate-500 mt-0.5">
                    Research, analyze and chat with your documents
                  </p>

                </div>

              </div>

              {/* RIGHT */}

              <div className="flex items-center gap-3">

                <div
                  className="
                    hidden
                    md:flex
                    items-center
                    gap-2
                    px-3
                    py-2
                    rounded-xl
                    bg-slate-50
                    border
                    border-slate-200
                  "
                >

                  <FileText
                    size={16}
                    className="text-slate-500"
                  />

                  <span className="text-sm font-medium text-slate-600">
                    {documents.length}{" "}
                    {documents.length === 1
                      ? "Document"
                      : "Documents"}
                  </span>

                </div>

                <div
                  className="
                    hidden
                    md:flex
                    items-center
                    gap-2
                    px-3
                    py-2
                    rounded-xl
                    bg-blue-50
                    border
                    border-blue-100
                  "
                >

                  <Sparkles
                    size={16}
                    className="text-blue-600"
                  />

                  <span className="text-sm font-medium text-blue-700">
                    AI Enabled
                  </span>

                </div>

              </div>

            </div>

          </div>

        </section>


        {/* =====================================================
            WORKSPACE
        ===================================================== */}

        <section className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 py-6">

          <div className="grid grid-cols-12 gap-5">

            {/* =================================================
                LEFT SIDEBAR
            ================================================= */}

            <aside
              className="
                col-span-12
                lg:col-span-3
                xl:col-span-3
                space-y-5
              "
            >

              {/* UPLOAD */}

              <div
                className="
                  bg-white
                  rounded-2xl
                  border
                  border-slate-200
                  shadow-sm
                  overflow-hidden
                "
              >

                <div
                  className="
                    px-5
                    py-4
                    border-b
                    border-slate-100
                    flex
                    items-center
                    justify-between
                  "
                >

                  <div className="flex items-center gap-2">

                    <div className="p-2 rounded-lg bg-blue-50">

                      <Upload
                        size={16}
                        className="text-blue-600"
                      />

                    </div>

                    <div>

                      <h2 className="font-semibold text-slate-900 text-sm">
                        Add Documents
                      </h2>

                      <p className="text-xs text-slate-400 mt-0.5">
                        Build your knowledge base
                      </p>

                    </div>

                  </div>

                </div>

                <div className="p-4">

                  <UploadSection
                    onUploadSuccess={loadDocuments}
                  />

                </div>

              </div>


              {/* DOCUMENTS */}

              <div
                className="
                  bg-white
                  rounded-2xl
                  border
                  border-slate-200
                  shadow-sm
                  overflow-hidden
                "
              >

                <div
                  className="
                    px-5
                    py-4
                    border-b
                    border-slate-100
                  "
                >

                  <div className="flex items-center justify-between">

                    <div className="flex items-center gap-2">

                      <FileText
                        size={17}
                        className="text-slate-600"
                      />

                      <h2 className="font-semibold text-slate-900 text-sm">
                        Documents
                      </h2>

                    </div>

                    <span
                      className="
                        min-w-6
                        h-6
                        px-1.5
                        rounded-full
                        bg-slate-100
                        text-slate-600
                        text-xs
                        font-semibold
                        flex
                        items-center
                        justify-center
                      "
                    >
                      {documents.length}
                    </span>

                  </div>

                </div>

                <div className="p-3">

                  <DocumentList
                    documents={documents}
                    onDelete={loadDocuments}
                    onSelect={(document) => {
                      setSelectedDocument(document);
                    }}
                  />

                </div>

              </div>


              {/* KNOWLEDGE STATUS */}

              <div
                className="
                  hidden
                  lg:block
                  rounded-2xl
                  border
                  border-blue-100
                  bg-blue-50/60
                  p-4
                "
              >

                <div className="flex items-center gap-2">

                  <CheckCircle2
                    size={17}
                    className="text-emerald-600"
                  />

                  <span className="text-sm font-semibold text-slate-800">
                    Knowledge Base
                  </span>

                </div>

                <p className="text-xs text-slate-500 mt-2 leading-5">
                  Your uploaded documents are available for
                  semantic search and AI-powered questions.
                </p>

              </div>

            </aside>


            {/* =================================================
                MAIN CONTENT
            ================================================= */}

            <div
              className="
                col-span-12
                lg:col-span-9
                xl:col-span-9
                space-y-5
              "
            >

              {/* =================================================
                  DOCUMENT VIEWER
              ================================================= */}

              <div
                className="
                  bg-white
                  rounded-2xl
                  border
                  border-slate-200
                  shadow-sm
                  overflow-hidden
                "
              >

                {/* Viewer toolbar */}

                <div
                  className="
                    h-14
                    px-5
                    border-b
                    border-slate-100
                    flex
                    items-center
                    justify-between
                  "
                >

                  <div className="flex items-center gap-3 min-w-0">

                    <div className="p-2 rounded-lg bg-red-50">

                      <FileText
                        size={17}
                        className="text-red-500"
                      />

                    </div>

                    <div className="min-w-0">

                      <p className="text-sm font-semibold text-slate-900 truncate">

                        {selectedDocument
                          ? selectedDocument.original_name
                          : "Document Preview"}

                      </p>

                      <p className="text-xs text-slate-400">

                        {selectedDocument
                          ? "Currently selected"
                          : "Select a document to preview"}

                      </p>

                    </div>

                  </div>

                  {selectedDocument && (
                    <div
                      className="
                        hidden
                        sm:flex
                        items-center
                        gap-2
                        px-3
                        py-1.5
                        rounded-lg
                        bg-emerald-50
                        text-emerald-700
                        text-xs
                        font-medium
                      "
                    >

                      <CheckCircle2 size={14} />

                      Document Loaded

                    </div>
                  )}

                </div>

                {/* PDF */}

                <div className="h-[600px] bg-slate-100">

                  <PDFViewer
                    fileUrl={
                      selectedDocument
                        ? getDocumentUrl(selectedDocument)
                        : undefined
                    }
                    fileName={
                      selectedDocument?.original_name
                    }
                  />

                </div>

              </div>


              {/* =================================================
                  AI CHAT
              ================================================= */}

              <div
                className="
                  bg-white
                  rounded-2xl
                  border
                  border-slate-200
                  shadow-sm
                  overflow-hidden
                "
              >

                {/* Chat header */}

                <div
                  className="
                    px-5
                    py-4
                    border-b
                    border-slate-100
                    flex
                    items-center
                    justify-between
                  "
                >

                  <div className="flex items-center gap-3">

                    <div
                      className="
                        w-9
                        h-9
                        rounded-xl
                        bg-gradient-to-br
                        from-blue-600
                        to-indigo-600
                        text-white
                        flex
                        items-center
                        justify-center
                        shadow-md
                        shadow-blue-500/20
                      "
                    >

                      <BrainCircuit size={18} />

                    </div>

                    <div>

                      <h2 className="font-semibold text-slate-900">
                        AI Research Assistant
                      </h2>

                      <p className="text-xs text-slate-400 mt-0.5">
                        Ask questions about your documents
                      </p>

                    </div>

                  </div>

                  <div
                    className="
                      hidden
                      sm:flex
                      items-center
                      gap-2
                      text-xs
                      text-slate-500
                    "
                  >

                    <MessageSquare size={14} />

                    {messages.length} messages

                  </div>

                </div>

                {/* Chat */}

                <div className="min-h-[420px] max-h-[650px] overflow-y-auto">

                  <ChatBox
                    messages={messages}
                    loading={loading}
                  />

                </div>

                {/* Input */}

                <div className="border-t border-slate-100 bg-slate-50/70 p-4">

                  <ChatInput
                    onSend={handleSend}
                    loading={loading}
                  />

                  <div className="flex items-center justify-center gap-2 mt-3">

                    <Sparkles
                      size={13}
                      className="text-blue-500"
                    />

                    <p className="text-[11px] text-slate-400">
                      AI answers are generated from your uploaded documents
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </section>

      </main>
    </Layout>
  );
}