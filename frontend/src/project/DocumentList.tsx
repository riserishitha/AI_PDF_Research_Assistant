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
    <div className="bg-white rounded-xl shadow p-6">

      <h2 className="text-xl font-semibold mb-4">
        Uploaded Documents
      </h2>

      {documents.length === 0 ? (

        <p className="text-slate-500">
          No documents uploaded.
        </p>

      ) : (

        <div className="space-y-4">

          {documents.map((doc) => (

            <div
              key={doc.id}
              className="
              border
              rounded-xl
              p-4
              flex
              justify-between
              items-center
              "
            >

              <div>

                <p className="font-semibold">
                  {doc.original_name}
                </p>

                <p className="text-sm text-slate-500">
                  {(doc.file_size / 1024).toFixed(2)} KB
                </p>

              </div>

              <button
                onClick={() =>
                  handleDelete(doc.id)
                }
                className="
                text-red-600
                hover:text-red-700
                font-medium
                "
              >
                🗑 Delete
              </button>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}