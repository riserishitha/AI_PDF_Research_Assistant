import { useState } from "react";

interface Props {
  onSend: (question: string) => Promise<void>;
}

export default function ChatInput({
  onSend,
}: Props) {
  const [question, setQuestion] =
    useState("");

  async function handleSend() {
    if (!question.trim()) return;

    await onSend(question);

    setQuestion("");
  }

  return (
    <div className="flex gap-4 mt-5">

      <input
        value={question}
        onChange={(e) =>
          setQuestion(e.target.value)
        }
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSend();
          }
        }}
        placeholder="Ask anything about your document..."
        className="
        flex-1
        border
        rounded-xl
        px-5
        py-4
        "
      />

      <button
        onClick={handleSend}
        className="
        bg-blue-600
        hover:bg-blue-700
        text-white
        rounded-xl
        px-8
        "
      >
        Send
      </button>

    </div>
  );
}