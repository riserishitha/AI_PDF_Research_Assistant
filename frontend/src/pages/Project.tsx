import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Layout from "../components/layout/Layout";
import Header from "../components/layout/Header";

import UploadSection from "../project/UploadSection";
import DocumentList from "../project/DocumentList";
import ChatBox from "../project/ChatBox";
import ChatInput from "../project/ChatInput";

import {
  getDocuments,
} from "../services/documentService";

import {
  askQuestion,
  getChatHistory,
} from "../services/chatService";

import type { Document } from "../types/document";
import type { Message } from "../types/chat";

export default function Project() {
  const { projectId } = useParams();

  const [documents, setDocuments] = useState<Document[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    loadDocuments();
    loadChatHistory();
  }, [projectId]);

  async function loadDocuments() {
    if (!projectId) return;

    try {
      const data = await getDocuments(projectId);
      setDocuments(data);
    } catch (err) {
      console.error(err);
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
    console.error(err);
  }
}
async function handleSend(question: string) {
  if (!projectId) return;

  const userMessage: Message = {
    id: crypto.randomUUID(),
    role: "user",
    content: question,
  };

  const thinkingMessage: Message = {
    id: crypto.randomUUID(),
    role: "assistant",
    content: "",
    loading: true,
  };

  setMessages((prev) => [
    ...prev,
    userMessage,
    thinkingMessage,
  ]);

  try {
    const response = await askQuestion(
      projectId,
      question
    );

    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === thinkingMessage.id
          ? {
              ...msg,
              loading: false,
              content: response.answer,
            }
          : msg
      )
    );

  } catch (err) {
    console.error(err);

    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === thinkingMessage.id
          ? {
              ...msg,
              loading: false,
              content:
                "Sorry, I couldn't generate an answer.",
            }
          : msg
      )
    );
  }
}
  return (
    <Layout>
      <Header />

      <div className="max-w-7xl mx-auto px-8 py-8">

        {/* Page Header */}

        <div className="mb-8">

          <h1 className="text-4xl font-bold text-slate-900">
            AI Project Workspace
          </h1>

          <p className="text-slate-500 mt-2">
            Upload PDFs, explore their contents, and chat with your AI assistant.
          </p>

        </div>

        {/* Main Layout */}

        <div className="grid grid-cols-12 gap-8">

          {/* Left Panel */}

          <div className="col-span-4 space-y-6">

            <UploadSection
              onUploadSuccess={loadDocuments}
            />

            <DocumentList
              documents={documents}
              onDelete={loadDocuments}
            />

          </div>

          {/* Right Panel */}

          <div className="col-span-8 flex flex-col">

            <ChatBox
messages={messages}
/>

<ChatInput onSend={handleSend}
/>

          </div>

        </div>

      </div>

    </Layout>
  );
}