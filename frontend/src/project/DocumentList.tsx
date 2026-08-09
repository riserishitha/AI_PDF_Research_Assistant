import { FileText, Trash2, Eye } from "lucide-react";

import { deleteDocument } from "../services/documentService";
import type { Document } from "../types/document";

interface Props {
  documents: Document[];
  onDelete: () => void;
  onSelect: (doc: Document) => void;
  selectedDocumentId?: string;
}

export default function DocumentList({
  documents,
  onDelete,
  onSelect,
  selectedDocumentId,
}: Props) {

  async function handleDelete(
    e: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) {
    e.stopPropagation();

    const confirmed = window.confirm(
      "Delete this document?"
    );

    if (!confirmed) return;

    try {
      await deleteDocument(id);
      onDelete();
    } catch (err) {
      console.error(err);
      alert("Unable to delete document");
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">

      {/* Header */}

      <div className="flex justify-between items-center mb-6">

        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Uploaded Documents
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            {documents.length} document
            {documents.length !== 1 ? "s" : ""}
          </p>
        </div>

        <div className="bg-blue-100 p-3 rounded-xl">
          <FileText
            className="text-blue-600"
            size={22}
          />
        </div>

      </div>

      {/* Empty State */}

      {documents.length === 0 ? (

        <div className="text-center py-12">

          <FileText
            size={60}
            className="mx-auto text-slate-300"
          />

          <h3 className="mt-5 text-lg font-semibold text-slate-800">
            No PDFs Uploaded
          </h3>

          <p className="text-slate-500 mt-2">
            Upload a PDF to begin chatting with your documents.
          </p>

        </div>

      ) : (

        <div className="space-y-3">

          {documents.map((doc) => {

            const isSelected =
              selectedDocumentId === doc.id;

            return (
              <div
                key={doc.id}
                onClick={() => onSelect(doc)}
                className={`
                  group
                  cursor-pointer
                  flex
                  justify-between
                  items-center
                  rounded-xl
                  border
                  p-4
                  transition-all
                  duration-200

                  ${
                    isSelected
                      ? "border-blue-500 bg-blue-50 shadow-sm"
                      : "border-slate-200 hover:border-blue-300 hover:bg-slate-50"
                  }
                `}
              >

                {/* Document information */}

                <div className="flex items-center gap-4 min-w-0">

                  <div
                    className={`
                      p-3
                      rounded-xl
                      shrink-0
                      ${
                        isSelected
                          ? "bg-blue-100"
                          : "bg-red-100"
                      }
                    `}
                  >
                    <FileText
                      size={22}
                      className={
                        isSelected
                          ? "text-blue-600"
                          : "text-red-600"
                      }
                    />
                  </div>

                  <div className="min-w-0">

                    <h3 className="font-semibold text-slate-800 break-all">
                      {doc.original_name}
                    </h3>

                    <p className="text-sm text-slate-500 mt-1">
                      {(doc.file_size / 1024).toFixed(2)} KB
                    </p>

                  </div>

                </div>

                {/* Actions */}

                <div className="flex items-center gap-2 ml-3 shrink-0">

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelect(doc);
                    }}
                    title="Preview document"
                    className="
                      p-2
                      rounded-lg
                      text-slate-500
                      hover:text-blue-600
                      hover:bg-blue-100
                      transition
                    "
                  >
                    <Eye size={18} />
                  </button>

                  <button
                    type="button"
                    onClick={(e) =>
                      handleDelete(e, doc.id)
                    }
                    title="Delete document"
                    className="
                      p-2
                      rounded-lg
                      text-red-500
                      hover:text-red-600
                      hover:bg-red-50
                      transition
                    "
                  >
                    <Trash2 size={18} />
                  </button>

                </div>

              </div>
            );
          })}

        </div>

      )}

    </div>
  );
}