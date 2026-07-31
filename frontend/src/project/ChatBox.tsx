interface Message {
  role: "user" | "assistant";
  content: string;
}

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
      rounded-xl
      shadow
      h-[500px]
      overflow-y-auto
      p-6
      space-y-4
      "
    >

      {messages.length === 0 && (
        <p className="text-slate-400">
          Upload a PDF and ask your first question.
        </p>
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
            className={`max-w-[75%] rounded-xl px-4 py-3 ${
              message.role === "user"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-900"
            }`}
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