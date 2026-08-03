import { useEffect, useRef } from "react";
import { Bot, User, Loader2 } from "lucide-react";

import type { Message } from "../types/chat";

interface Props {
  messages: Message[];
}

export default function ChatBox({
  messages,
}: Props) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  return (
    <div
      className="
      bg-white
      rounded-3xl
      border
      shadow-sm
      h-[650px]
      flex
      flex-col
      overflow-hidden
      "
    >
      {/* Header */}

      <div
        className="
        px-6
        py-5
        border-b
        bg-gradient-to-r
        from-blue-50
        to-indigo-50
        "
      >
        <h2 className="text-xl font-bold text-slate-800">
          AI Conversation
        </h2>

        <p className="text-sm text-slate-500 mt-1">
          Ask anything about your uploaded documents.
        </p>
      </div>

      {/* Messages */}

      <div
        className="
        flex-1
        overflow-y-auto
        px-6
        py-6
        space-y-6
        bg-slate-50
        "
      >
        {messages.length === 0 && !loading && (
          <div className="flex flex-col items-center justify-center h-full text-center">

            <div
              className="
              w-16
              h-16
              rounded-full
              bg-blue-100
              flex
              items-center
              justify-center
              "
            >
              <Bot
                size={34}
                className="text-blue-600"
              />
            </div>

            <h3 className="mt-6 text-2xl font-semibold text-slate-800">
              Ready to help!
            </h3>

            <p className="mt-3 text-slate-500 max-w-md leading-7">
              Upload one or more PDF documents and ask
              questions about their content. I will answer
              using only the information from your documents.
            </p>
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
                flex
                gap-3
                max-w-[80%]
                ${
                  message.role === "user"
                    ? "flex-row-reverse"
                    : ""
                }
              `}
            >
              {/* Avatar */}

              <div
                className={`
                w-11
                h-11
                rounded-full
                flex
                items-center
                justify-center
                shrink-0
                ${
                  message.role === "assistant"
                    ? "bg-blue-100"
                    : "bg-slate-200"
                }
                `}
              >
                {message.role === "assistant" ? (
                  <Bot
                    size={22}
                    className="text-blue-600"
                  />
                ) : (
                  <User
                    size={20}
                    className="text-slate-700"
                  />
                )}
              </div>

              {/* Bubble */}

              <div>
                <div
                  className={`
                  rounded-3xl
                  px-5
                  py-4
                  whitespace-pre-wrap
                  leading-7
                  shadow-sm
                  ${
                    message.role === "assistant"
                      ? "bg-white border"
                      : "bg-blue-600 text-white"
                  }
                  `}
                >
                 {message.loading ? (
  <div className="flex items-center gap-3">

    <div className="flex gap-1">

      <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></span>

      <span
        className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
        style={{ animationDelay: "0.15s" }}
      ></span>

      <span
        className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
        style={{ animationDelay: "0.3s" }}
      ></span>

    </div>

    <span className="text-slate-500">
      AI is thinking...
    </span>

  </div>
) : (
  message.content
)}
                </div>

                <p
                  className={`
                  text-xs
                  mt-2
                  text-slate-400
                  ${
                    message.role === "user"
                      ? "text-right"
                      : ""
                  }
                  `}
                >
                  {new Date().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          </div>
        ))}

        {/* Loading */}

        {loading && (
          <div className="flex gap-3">

            <div
              className="
              w-11
              h-11
              rounded-full
              bg-blue-100
              flex
              items-center
              justify-center
              "
            >
              <Bot
                size={22}
                className="text-blue-600"
              />
            </div>

            <div
              className="
              bg-white
              border
              rounded-3xl
              px-5
              py-4
              flex
              items-center
              gap-3
              shadow-sm
              "
            >
              <Loader2
                size={18}
                className="animate-spin text-blue-600"
              />

              <span className="text-slate-500">
                AI is thinking...
              </span>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>
    </div>
  );
}