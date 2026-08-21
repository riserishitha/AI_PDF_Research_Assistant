import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Loader2,
  SendHorizontal,
} from "lucide-react";

interface Props {
  onSend: (question: string) => void;
  loading: boolean;
}

export default function ChatInput({
  onSend,
  loading,
}: Props) {
  const [question, setQuestion] = useState("");

  const textareaRef =
    useRef<HTMLTextAreaElement>(null);

  const resizeTextarea = useCallback(() => {
    const textarea = textareaRef.current;

    if (!textarea) return;

    textarea.style.height = "auto";

    const maxHeight = 160;
    const newHeight = Math.min(
      textarea.scrollHeight,
      maxHeight
    );

    textarea.style.height = `${newHeight}px`;
    textarea.style.overflowY =
      textarea.scrollHeight > maxHeight
        ? "auto"
        : "hidden";
  }, []);

  useEffect(() => {
    resizeTextarea();
  }, [question, resizeTextarea]);

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setQuestion(e.target.value);
  };

  const handleSend = useCallback(() => {
    const text = question.trim();

    if (!text || loading) return;

    onSend(text);
    setQuestion("");

    requestAnimationFrame(() => {
      const textarea = textareaRef.current;

      if (textarea) {
        textarea.style.height = "auto";
        textarea.style.overflowY = "hidden";
      }
    });
  }, [question, loading, onSend]);

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (
      e.key === "Enter" &&
      !e.shiftKey &&
      !e.nativeEvent.isComposing
    ) {
      e.preventDefault();
      handleSend();
    }
  };

  const isDisabled =
    loading || !question.trim();

  return (
    <div
      className="
        mt-6
        w-full
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-3
        shadow-sm
        transition-all
        duration-200
        focus-within:border-blue-300
        focus-within:shadow-md
      "
    >
      <div className="flex items-end gap-3">
        <textarea
          ref={textareaRef}
          rows={1}
          value={question}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          disabled={loading}
          placeholder="Ask anything about your uploaded documents..."
          aria-label="Ask a question about your uploaded documents"
          className="
            min-h-[56px]
            max-h-40
            flex-1
            resize-none
            overflow-hidden
            bg-transparent
            px-2
            py-3
            text-sm
            leading-6
            text-slate-700
            outline-none
            placeholder:text-slate-400
            disabled:cursor-not-allowed
            disabled:opacity-60
          "
        />

        <button
          type="button"
          onClick={handleSend}
          disabled={isDisabled}
          aria-label={
            loading ? "Sending question" : "Send question"
          }
          className="
            flex
            h-12
            w-12
            shrink-0
            items-center
            justify-center
            rounded-2xl
            bg-blue-600
            text-white
            transition-all
            duration-200
            hover:scale-105
            hover:bg-blue-700
            active:scale-95
            disabled:cursor-not-allowed
            disabled:bg-slate-300
            disabled:hover:scale-100
          "
        >
          {loading ? (
            <Loader2
              size={20}
              className="animate-spin"
            />
          ) : (
            <SendHorizontal size={20} />
          )}
        </button>
      </div>

      <div className="mt-2 flex items-center justify-between px-2">
        <p className="text-[11px] text-slate-400">
          <span className="hidden sm:inline">
            Press{" "}
            <span className="font-medium text-slate-500">
              Enter
            </span>{" "}
            to send ·{" "}
            <span className="font-medium text-slate-500">
              Shift + Enter
            </span>{" "}
            for a new line
          </span>

          <span className="sm:hidden">
            Enter to send · Shift + Enter for new line
          </span>
        </p>

        <span
          className={`
            text-[11px]
            transition-colors
            ${
              question.length > 2000
                ? "text-red-500"
                : "text-slate-400"
            }
          `}
        >
          {question.length}
        </span>
      </div>
    </div>
  );
}