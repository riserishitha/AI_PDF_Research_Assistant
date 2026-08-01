import type { Message } from "../types/chat";

interface Props {
  messages: Message[];
  loading: boolean;
}

export default function ChatBox({
  messages,
  loading,
}: Props) {
  return (
    <div
      className="
      bg-white
      rounded-2xl
      shadow
      h-[600px]
      overflow-y-auto
      p-6
      space-y-5
      "
    >
      {messages.length === 0 && (
        <div className="text-center text-slate-500 mt-20">
          <h2 className="text-2xl font-semibold">
            Ask anything about your PDF
          </h2>

          <p className="mt-2">
            Example:
          </p>

          <div className="mt-6 space-y-2">
            <p>"Summarize this document"</p>
            <p>"What are the key skills?"</p>
            <p>"Explain section 3"</p>
          </div>
        </div>
      )}

      {messages.map((message, index) => (
        <div
          key={index}
          className={`flex ${
            message.role === "user"
              ? "justify-end"
              : "justify-start"
          }`}
        >
          <div
            className={`
            max-w-[80%]
            rounded-2xl
            px-5
            py-4
            whitespace-pre-wrap
            ${
              message.role === "user"
                ? "bg-blue-600 text-white"
                : "bg-slate-100 text-slate-800"
            }
            `}
          >
            {message.content}
          </div>
        </div>
      ))}

      {loading && (
        <div className="text-slate-500">
          AI is thinking...
        </div>
      )}
    </div>
  );
}