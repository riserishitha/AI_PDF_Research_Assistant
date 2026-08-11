import { useEffect, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Maximize2,
  Minus,
  Plus,
  RotateCcw,
  FileText,
  Loader2,
} from "lucide-react";

import { Document, Page, pdfjs } from "react-pdf";

import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

interface Props {
  fileUrl?: string;
  fileName?: string;
}

export default function PDFViewer({
  fileUrl,
  fileName,
}: Props) {
  const [numPages, setNumPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [scale, setScale] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  /*
   * Reset viewer whenever another document is selected.
   */
  useEffect(() => {
    setCurrentPage(1);
    setScale(1);
    setNumPages(0);
    setError(false);
  }, [fileUrl]);

  function handleLoadSuccess({
    numPages,
  }: {
    numPages: number;
  }) {
    setNumPages(numPages);
    setCurrentPage(1);
    setLoading(false);
    setError(false);
  }

  function handleLoadError() {
    setLoading(false);
    setError(true);
  }

  function zoomIn() {
    setScale((prev) =>
      Math.min(prev + 0.1, 2)
    );
  }

  function zoomOut() {
    setScale((prev) =>
      Math.max(prev - 0.1, 0.5)
    );
  }

  function resetZoom() {
    setScale(1);
  }

  function previousPage() {
    setCurrentPage((prev) =>
      Math.max(prev - 1, 1)
    );
  }

  function nextPage() {
    setCurrentPage((prev) =>
      Math.min(prev + 1, numPages)
    );
  }

  function openFullscreen() {
    const viewer = document.getElementById(
      "pdf-viewer"
    );

    if (viewer?.requestFullscreen) {
      viewer.requestFullscreen();
    }
  }

  /*
   * No document selected.
   */
  if (!fileUrl) {
    return (
      <div
        className="
          h-full
          bg-white
          rounded-3xl
          border
          border-slate-200
          shadow-sm
          flex
          flex-col
          items-center
          justify-center
          text-center
          p-8
        "
      >
        <div
          className="
            w-20
            h-20
            rounded-2xl
            bg-blue-50
            flex
            items-center
            justify-center
          "
        >
          <FileText
            size={38}
            className="text-blue-500"
          />
        </div>

        <h3 className="mt-6 text-xl font-semibold text-slate-800">
          No document selected
        </h3>

        <p className="mt-2 text-sm text-slate-500 max-w-sm">
          Select a document from the list to preview
          its contents here.
        </p>
      </div>
    );
  }

  return (
    <div
      id="pdf-viewer"
      className="
        h-full
        bg-slate-100
        rounded-3xl
        border
        border-slate-200
        shadow-sm
        overflow-hidden
        flex
        flex-col
      "
    >

      {/* HEADER */}

      <div
        className="
          h-16
          px-5
          bg-white
          border-b
          border-slate-200
          flex
          items-center
          justify-between
          shrink-0
        "
      >

        <div className="flex items-center gap-3 min-w-0">

          <div
            className="
              w-9
              h-9
              rounded-lg
              bg-red-50
              flex
              items-center
              justify-center
              shrink-0
            "
          >
            <FileText
              size={19}
              className="text-red-500"
            />
          </div>

          <div className="min-w-0">

            <p
              className="
                font-semibold
                text-slate-800
                truncate
                max-w-[300px]
              "
              title={fileName}
            >
              {fileName || "PDF Document"}
            </p>

            <p className="text-xs text-slate-400">
              {numPages > 0
                ? `${numPages} page${
                    numPages !== 1 ? "s" : ""
                  }`
                : "Loading document..."}
            </p>

          </div>

        </div>

        <button
          onClick={() => window.open(fileUrl, "_blank")}
          className="
            p-2
            rounded-lg
            text-slate-500
            hover:text-blue-600
            hover:bg-blue-50
            transition
          "
          title="Download / open PDF"
        >
          <Download size={19} />
        </button>

      </div>

      {/* PDF CONTENT */}

      <div
        className="
          flex-1
          overflow-auto
          p-6
          flex
          justify-center
          bg-slate-100
        "
      >

        {loading && (
          <div className="flex items-center justify-center">
            <div className="flex items-center gap-3 text-slate-500">

              <Loader2
                size={22}
                className="animate-spin text-blue-600"
              />

              <span>
                Loading PDF...
              </span>

            </div>
          </div>
        )}

        {error && (
          <div className="flex items-center justify-center">

            <div className="text-center max-w-sm">

              <div
                className="
                  w-16
                  h-16
                  mx-auto
                  rounded-2xl
                  bg-red-50
                  flex
                  items-center
                  justify-center
                "
              >
                <FileText
                  size={30}
                  className="text-red-500"
                />
              </div>

              <h3 className="mt-5 font-semibold text-slate-800">
                Unable to load PDF
              </h3>

              <p className="text-sm text-slate-500 mt-2">
                The document could not be loaded.
                Check that the backend file URL is
                accessible.
              </p>

              <button
                onClick={() => {
                  setError(false);
                  setLoading(true);
                }}
                className="
                  mt-5
                  px-4
                  py-2
                  rounded-lg
                  bg-blue-600
                  hover:bg-blue-700
                  text-white
                  text-sm
                  font-medium
                "
              >
                Try Again
              </button>

            </div>

          </div>
        )}

        {!error && (
          <Document
            file={fileUrl}
            onLoadSuccess={handleLoadSuccess}
            onLoadError={handleLoadError}
            loading={
              <div className="flex items-center gap-3 text-slate-500">
                <Loader2
                  size={22}
                  className="animate-spin text-blue-600"
                />
                Loading PDF...
              </div>
            }
          >
            {numPages > 0 && (
              <Page
                pageNumber={currentPage}
                scale={scale}
                renderTextLayer
                renderAnnotationLayer
              />
            )}
          </Document>
        )}

      </div>

      {/* TOOLBAR */}

      <div
        className="
          h-16
          px-4
          bg-white
          border-t
          border-slate-200
          flex
          items-center
          justify-between
          shrink-0
        "
      >

        {/* PAGE NAVIGATION */}

        <div className="flex items-center gap-2">

          <button
            onClick={previousPage}
            disabled={currentPage <= 1}
            className="
              p-2
              rounded-lg
              hover:bg-slate-100
              disabled:opacity-30
              disabled:cursor-not-allowed
              transition
            "
            title="Previous page"
          >
            <ChevronLeft size={20} />
          </button>

          <div
            className="
              min-w-[75px]
              text-center
              text-sm
              font-medium
              text-slate-600
            "
          >
            {numPages > 0
              ? `${currentPage} / ${numPages}`
              : "- / -"}
          </div>

          <button
            onClick={nextPage}
            disabled={
              currentPage >= numPages ||
              numPages === 0
            }
            className="
              p-2
              rounded-lg
              hover:bg-slate-100
              disabled:opacity-30
              disabled:cursor-not-allowed
              transition
            "
            title="Next page"
          >
            <ChevronRight size={20} />
          </button>

        </div>

        {/* ZOOM */}

        <div className="flex items-center gap-1">

          <button
            onClick={zoomOut}
            disabled={scale <= 0.5}
            className="
              p-2
              rounded-lg
              hover:bg-slate-100
              disabled:opacity-30
              transition
            "
            title="Zoom out"
          >
            <Minus size={18} />
          </button>

          <span
            className="
              w-14
              text-center
              text-sm
              font-medium
              text-slate-600
            "
          >
            {Math.round(scale * 100)}%
          </span>

          <button
            onClick={zoomIn}
            disabled={scale >= 2}
            className="
              p-2
              rounded-lg
              hover:bg-slate-100
              disabled:opacity-30
              transition
            "
            title="Zoom in"
          >
            <Plus size={18} />
          </button>

          <button
            onClick={resetZoom}
            className="
              p-2
              rounded-lg
              hover:bg-slate-100
              text-slate-500
              transition
            "
            title="Reset zoom"
          >
            <RotateCcw size={17} />
          </button>

          <button
            onClick={openFullscreen}
            className="
              p-2
              rounded-lg
              hover:bg-slate-100
              text-slate-500
              transition
            "
            title="Fullscreen"
          >
            <Maximize2 size={17} />
          </button>

        </div>

      </div>

    </div>
  );
}