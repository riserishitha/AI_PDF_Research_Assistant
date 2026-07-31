import { useState } from "react";

interface Props {
  onSend: (question: string) => void;
  disabled?: boolean;
}

export default function ChatInput({
  onSend,
  disabled,
}: Props) {

  const [question, setQuestion] = useState("");

  function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    if (!question.trim()) return;

    onSend(question);

    setQuestion("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-4 mt-4"
    >

      <input
        value={question}
        onChange={(e) =>
          setQuestion(e.target.value)
        }
        placeholder="Ask anything about your PDF..."
        className="
        flex-1
        border
        rounded-xl
        px-4
        py-3
        "
        disabled={disabled}
      />

      <button
        type="submit"
        disabled={disabled}
        className="
        bg-blue-600
        text-white
        px-6
        rounded-xl
        hover:bg-blue-700
        disabled:bg-gray-400
        "
      >
        Send
      </button>

    </form>
  );
}