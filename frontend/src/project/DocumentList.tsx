import type { Document } from "../types/document";

interface Props {
  documents: Document[];
}

export default function DocumentList({
  documents,
}: Props) {
  return (
    <div className="bg-white rounded-xl shadow p-6">

      <h2 className="text-xl font-semibold">
        Uploaded Documents
      </h2>

      <div className="mt-4 space-y-3">

        {documents.length === 0 ? (
          <p className="text-slate-500">
            No documents uploaded.
          </p>
        ) : (
          documents.map((doc) => (
            <div
              key={doc.id}
              className="
              border
              rounded-lg
              p-3
              flex
              justify-between
              items-center
              "
            >
              <div>

                <p className="font-medium">
                  {doc.original_name}
                </p>

                <p className="text-sm text-slate-500">
                  {(doc.file_size / 1024).toFixed(2)} KB
                </p>

              </div>

              <span className="text-green-600 font-medium">
                Uploaded
              </span>

            </div>
          ))
        )}

      </div>

    </div>
  );
}