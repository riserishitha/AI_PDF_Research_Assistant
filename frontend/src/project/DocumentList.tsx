import { FileText, Trash2 } from "lucide-react";

import { deleteDocument } from "../services/documentService";
import type { Document } from "../types/document";

interface Props {
  documents: Document[];
  onDelete: () => void;
}

export default function DocumentList({
  documents,
  onDelete,
}: Props) {

  async function handleDelete(id: string) {

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

          <h2 className="text-xl font-bold">
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

          <h3 className="mt-5 text-lg font-semibold">

            No PDFs Uploaded

          </h3>

          <p className="text-slate-500 mt-2">

            Upload a PDF to begin chatting with your documents.

          </p>

        </div>

      ) : (

        <div className="space-y-4">

          {documents.map((doc) => (

            <div
              key={doc.id}
              className="
                flex
                justify-between
                items-center
                rounded-xl
                border
                border-slate-200
                p-4
                hover:shadow-md
                hover:border-blue-300
                transition-all
                duration-200
              "
            >

              <div className="flex items-center gap-4">

                <div className="bg-red-100 p-3 rounded-xl">

                  <FileText
                    className="text-red-600"
                    size={22}
                  />

                </div>

                <div>

                  <h3 className="font-semibold text-slate-800 break-all">

                    {doc.original_name}

                  </h3>

                  <p className="text-sm text-slate-500 mt-1">

                    {(doc.file_size / 1024).toFixed(2)} KB

                  </p>

                </div>

              </div>

              <button
                onClick={() => handleDelete(doc.id)}
                className="
                  flex
                  items-center
                  gap-2
                  bg-red-50
                  hover:bg-red-100
                  text-red-600
                  px-4
                  py-2
                  rounded-lg
                  transition
                "
              >

                <Trash2 size={18} />

                Delete

              </button>

            </div>

          ))}

        </div>

      )}

    </div>

  );
}