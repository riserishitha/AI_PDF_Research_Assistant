export default function UploadSection() {
  return (
    <div className="bg-white rounded-xl shadow p-6">

      <h2 className="text-xl font-semibold">
        Upload PDF
      </h2>

      <div
        className="
        border-2
        border-dashed
        rounded-lg
        mt-4
        p-10
        text-center
        "
      >
        <p>Select a PDF to upload.</p>

        <button
          className="
          mt-4
          bg-blue-600
          text-white
          px-5
          py-2
          rounded
          "
        >
          Choose File
        </button>

      </div>

    </div>
  );
}