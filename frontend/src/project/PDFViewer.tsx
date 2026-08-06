import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";

// Required for PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

interface Props {
  fileUrl?: string;
}

export default function PDFViewer({
  fileUrl,
}: Props) {
  const [numPages, setNumPages] = useState(0);

  if (!fileUrl) {
    return (
      <div
        className="
        h-full
        bg-white
        rounded-3xl
        border
        flex
        items-center
        justify-center
        text-slate-400
        "
      >
        Select a document to preview
      </div>
    );
  }

  return (
    <div
      className="
      bg-white
      rounded-3xl
      border
      shadow-sm
      p-4
      overflow-auto
      h-full
      "
    >
      <Document
        file={fileUrl}
        onLoadSuccess={({ numPages }) =>
          setNumPages(numPages)
        }
      >
        {Array.from(
          new Array(numPages),
          (_, index) => (
            <Page
              key={index}
              pageNumber={index + 1}
              width={450}
            />
          )
        )}
      </Document>
    </div>
  );
}