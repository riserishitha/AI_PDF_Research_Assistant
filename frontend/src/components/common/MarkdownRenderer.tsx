import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface Props {
  content: string;
}

export default function MarkdownRenderer({
  content,
}: Props) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        code({ inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(
            className || ""
          );

          if (!inline && match) {
            return (
              <SyntaxHighlighter
                style={oneDark}
                language={match[1]}
                PreTag="div"
              >
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            );
          }

          return (
            <code
              className="bg-slate-100 px-1 py-0.5 rounded"
              {...props}
            >
              {children}
            </code>
          );
        },

        h1: ({ children }) => (
          <h1 className="text-3xl font-bold mb-4">
            {children}
          </h1>
        ),

        h2: ({ children }) => (
          <h2 className="text-2xl font-bold mb-3">
            {children}
          </h2>
        ),

        h3: ({ children }) => (
          <h3 className="text-xl font-semibold mb-2">
            {children}
          </h3>
        ),

        p: ({ children }) => (
          <p className="mb-4 leading-8">
            {children}
          </p>
        ),

        ul: ({ children }) => (
          <ul className="list-disc ml-6 mb-4">
            {children}
          </ul>
        ),

        ol: ({ children }) => (
          <ol className="list-decimal ml-6 mb-4">
            {children}
          </ol>
        ),

        blockquote: ({ children }) => (
          <blockquote className="border-l-4 border-blue-500 pl-4 italic text-slate-600 my-4">
            {children}
          </blockquote>
        ),

        table: ({ children }) => (
          <table className="table-auto border-collapse border border-slate-300 my-4">
            {children}
          </table>
        ),

        th: ({ children }) => (
          <th className="border px-3 py-2 bg-slate-100">
            {children}
          </th>
        ),

        td: ({ children }) => (
          <td className="border px-3 py-2">
            {children}
          </td>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}