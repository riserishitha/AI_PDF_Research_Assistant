import { useRef, useState } from "react";
import { useParams } from "react-router-dom";

import { uploadDocument } from "../services/documentService";

interface UploadSectionProps {
  onUploadSuccess: () => void;
}

export default function UploadSection({
  onUploadSuccess,
}: UploadSectionProps) {
  const { projectId } = useParams();

  const inputRef =
    useRef<HTMLInputElement>(null);

  const [uploading, setUploading] =
    useState(false);

  async function handleFile(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];

    if (!file || !projectId) return;

    try {
      setUploading(true);

      await uploadDocument(
        projectId,
        file
      );

      onUploadSuccess();
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="bg-white rounded-xl shadow p-6">

      <h2 className="text-xl font-semibold">
        Upload PDF
      </h2>

      <div
        className="
        border-2
        border-dashed
        rounded-xl
        mt-5
        p-10
        text-center
        border-slate-300
        "
      >

        <input
          ref={inputRef}
          hidden
          type="file"
          accept=".pdf"
          onChange={handleFile}
        />

        <button
          onClick={() =>
            inputRef.current?.click()
          }
          className="
          bg-blue-600
          hover:bg-blue-700
          text-white
          px-6
          py-3
          rounded-lg
          transition
          "
        >
          {uploading
            ? "Uploading..."
            : "Choose PDF"}
        </button>

        <p className="text-sm text-slate-500 mt-4">
          PDF only
        </p>

      </div>

    </div>
  );
}