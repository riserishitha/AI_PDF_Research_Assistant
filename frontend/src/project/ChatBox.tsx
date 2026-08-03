import { useEffect, useRef } from "react";
import { Bot, User } from "lucide-react";

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
  }, [messages]);

  return (
    <div
      className="
      bg-white
      rounded-3xl
      border
      border-slate-200
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
          Ask questions about your uploaded PDFs.
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
        {messages.length === 0 && (
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
              questions about their content.
              I will answer using the information
              available in those documents.
            </p>

          </div>
        )}

        {messages.map((message) => (

          <div
            key={message.id}
            className={`flex ${
              message.role === "user"
                ? "justify-end"
                : "justify-start"
            }`}
          >

            <div
              className={`flex gap-3 max-w-[80%] ${
                message.role === "user"
                  ? "flex-row-reverse"
                  : ""
              }`}
            >

              {/* Avatar */}

              <div
                className={`
                w-11
                h-11
                rounded-full
                shrink-0
                flex
                items-center
                justify-center
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
                      ? "bg-white border border-slate-200 text-slate-700"
                      : "bg-blue-600 text-white"
                  }
                  `}
                >

                  {message.loading ? (

                    <div className="flex items-center gap-3">

                      <div className="flex gap-1">

                        <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce"></span>

                        <span
                          className="w-2 h-2 rounded-full bg-blue-500 animate-bounce"
                          style={{
                            animationDelay: "0.15s",
                          }}
                        ></span>

                        <span
                          className="w-2 h-2 rounded-full bg-blue-500 animate-bounce"
                          style={{
                            animationDelay: "0.30s",
                          }}
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
                  text-slate-400
                  mt-2
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

        <div ref={bottomRef} />

      </div>

    </div>
  );
}