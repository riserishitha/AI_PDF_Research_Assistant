import { useRef, useState } from "react";
import { SendHorizontal } from "lucide-react";

interface Props {
    onSend: (question: string) => void;
    loading: boolean;
}

export default function ChatInput({
  onSend,
}: Props) {
  const [question, setQuestion] = useState("");

  const textareaRef =
    useRef<HTMLTextAreaElement>(null);

  function resizeTextarea() {
    if (!textareaRef.current) return;

    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height =
      textareaRef.current.scrollHeight + "px";
  }

  function handleChange(
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) {
    setQuestion(e.target.value);
    resizeTextarea();
  }

  function handleSend() {
    const text = question.trim();

    if (!text) return;

    onSend(text);

    setQuestion("");

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
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
      border-slate-200
      rounded-3xl
      shadow-sm
      p-4
      "
    >
      <div className="flex items-end gap-4">

        <textarea
          ref={textareaRef}
          rows={1}
          value={question}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Ask anything about your uploaded documents..."
          className="
          flex-1
          resize-none
          overflow-hidden
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
          disabled={!question.trim()}
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
          hover:scale-105
          active:scale-95
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
          Press <span className="font-semibold">Enter</span> to send •{" "}
          <span className="font-semibold">
            Shift + Enter
          </span>{" "}
          for a new line
        </p>

        <span className="text-xs text-slate-400">
          {question.length} characters
        </span>

      </div>
    </div>
  );
}