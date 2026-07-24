export default function ChatInput() {
  return (
    <div className="flex gap-4 mt-4">

      <input
        placeholder="Ask anything..."
        className="
        flex-1
        border
        rounded-lg
        px-4
        py-3
        "
      />

      <button
        className="
        bg-blue-600
        text-white
        px-6
        rounded-lg
        "
      >
        Send
      </button>

    </div>
  );
}