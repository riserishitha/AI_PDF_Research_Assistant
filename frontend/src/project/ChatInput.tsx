import { useState } from "react";
import { SendHorizontal } from "lucide-react";

interface Props {
  onSend: (question: string) => void;
  loading: boolean;
}

export default function ChatInput({
  onSend,
  loading,
}: Props) {
  const [question, setQuestion] = useState("");

  function handleSend() {
    const text = question.trim();

    if (!text || loading) return;

    onSend(text);
    setQuestion("");
  }

  function handleKeyDown(
    e: React.KeyboardEvent<HTMLTextAreaElement>
  ) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div
      className="
      mt-6
      bg-white
      border
      rounded-3xl
      shadow-sm
      p-4
      "
    >
      <div className="flex items-end gap-4">

        <textarea
          rows={1}
          value={question}
          disabled={loading}
          onChange={(e) =>
            setQuestion(e.target.value)
          }
          onKeyDown={handleKeyDown}
          placeholder="Ask anything about your uploaded documents..."
          className="
          flex-1
          resize-none
          border-none
          outline-none
          bg-transparent
          text-slate-700
          placeholder:text-slate-400
          text-base
          leading-7
          max-h-40
          "
        />

        <button
          onClick={handleSend}
          disabled={loading || !question.trim()}
          className="
          w-14
          h-14
          rounded-2xl
          bg-blue-600
          hover:bg-blue-700
          disabled:bg-slate-300
          disabled:cursor-not-allowed
          flex
          items-center
          justify-center
          transition-all
          duration-200
          "
        >
          <SendHorizontal
            size={22}
            className="text-white"
          />
        </button>

      </div>

      <div className="flex justify-between items-center mt-3">

        <p className="text-xs text-slate-400">
          Press <span className="font-semibold">Enter</span> to send •
          <span className="font-semibold"> Shift + Enter</span> for a new line
        </p>

        {loading && (
          <span className="text-xs text-blue-600 font-medium">
            AI is generating a response...
          </span>
        )}

      </div>
    </div>
  );
}