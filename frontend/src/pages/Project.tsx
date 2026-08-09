import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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

  const [documents, setDocuments] = useState<Document[]>([]);
  const [selectedDocument, setSelectedDocument] =
    useState<Document | null>(null);

  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!projectId) return;

    loadDocuments();
    loadChatHistory();

    // Reset selected document when changing projects
    setSelectedDocument(null);
  }, [projectId]);

  async function loadDocuments() {
    if (!projectId) return;

    try {
      const data = await getDocuments(projectId);

      setDocuments(data);

      // If the currently selected document was deleted,
      // clear the preview.
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

  /*
   * Your FastAPI server exposes:
   *
   * /uploads/...
   *
   * Adjust this if your backend stores the relative path
   * differently.
   */
  function getDocumentUrl(document: Document) {
    const baseUrl = "http://127.0.0.1:8000";

    return `${baseUrl}/${document.file_path
      .replace(/\\/g, "/")
      .replace(/^\/+/, "")}`;
  }

  return (
    <Layout>
      <Header />

      <div className="max-w-7xl mx-auto px-8 py-8">

        {/* PAGE HEADER */}

        <div className="mb-8">

          <div className="flex items-center justify-between">

            <div>
              <h1 className="text-4xl font-bold text-slate-900">
                AI Project Workspace
              </h1>

              <p className="text-slate-500 mt-2">
                Upload PDFs, explore their contents, and chat
                with your AI assistant.
              </p>
            </div>

            <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-100 rounded-xl">

              <span className="w-2 h-2 rounded-full bg-green-500" />

              <span className="text-sm font-medium text-slate-600">
                AI Assistant Ready
              </span>

            </div>

          </div>

        </div>

        {/* MAIN LAYOUT */}

        <div className="grid grid-cols-12 gap-8">

          {/* LEFT SIDEBAR */}

          <div className="col-span-12 lg:col-span-4 space-y-6">

            {/* UPLOAD */}

            <UploadSection
              onUploadSuccess={loadDocuments}
            />

            {/* DOCUMENT LIST */}

            <DocumentList
              documents={documents}
              onDelete={loadDocuments}
              onSelect={(document) => {
                setSelectedDocument(document);
              }}
            />

          </div>

          {/* RIGHT SIDE */}

          <div className="col-span-12 lg:col-span-8 space-y-6">

            {/* PDF PREVIEW */}

            <div className="h-[650px]">

              <PDFViewer
                fileUrl={
                  selectedDocument
                    ? getDocumentUrl(selectedDocument)
                    : undefined
                }
              />

            </div>

            {/* CHAT */}

            <div className="flex flex-col">

              <ChatBox
                messages={messages}
                loading={loading}
              />

              <ChatInput
                onSend={handleSend}
                loading={loading}
              />

            </div>

          </div>

        </div>

      </div>
    </Layout>
  );
}