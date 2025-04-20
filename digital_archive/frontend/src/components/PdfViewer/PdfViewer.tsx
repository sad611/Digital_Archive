import * as PDFJS from "pdfjs-dist";
import type {
  PDFDocumentProxy,
  RenderParameters,
} from "pdfjs-dist/types/src/display/api";
import { useCallback, useRef, useState, useEffect } from "react";

interface PdfProps {
  src: string; 
}

export default function PdfJs(props: PdfProps) {
  PDFJS.GlobalWorkerOptions.workerSrc =
    "https://unpkg.com/pdfjs-dist@4.8.69/build/pdf.worker.min.mjs";
  const { src } = props;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [pdfDoc, setPdfDoc] = useState<PDFDocumentProxy>();
  const [currentPage, setCurrentPage] = useState(1);
  let renderTask: PDFJS.RenderTask;
  const renderPage = useCallback(
    (pageNum: number, pdf = pdfDoc) => {
      const canvas = canvasRef.current;
      if (!canvas || !pdf) return;
  
      // Cancel any ongoing render task
      if (renderTask) {
        renderTask.cancel();
      }
  
      pdf.getPage(pageNum)
        .then((page) => {
            const rotation = (page.rotate || 0) % 360;
            const viewport = page.getViewport({
              scale: 1.5,
              rotation: rotation, 
            });
          canvas.height = viewport.height;
          canvas.width = viewport.width;
  
          const renderContext: RenderParameters = {
            canvasContext: canvas.getContext("2d")!,
            viewport: viewport,
          };
  
          renderTask = page.render(renderContext);
          return renderTask.promise;
        })
        .catch((error) => {
          if (error?.name === 'RenderingCancelledException') {
            // Expected cancellation, no action needed
          } else {
            console.error('Render error:', error);
          }
        });
    },
    [pdfDoc]
  );
  useEffect(() => {
    renderPage(currentPage, pdfDoc);
  }, [pdfDoc, currentPage, renderPage]);
  useEffect(() => {
    const loadingTask = PDFJS.getDocument(src);
    loadingTask.promise.then(
      (loadedDoc) => {
        setPdfDoc(loadedDoc);
      },
      (error) => {
        console.error(error);
      }
    );
  }, [src]);
  const nextPage = () =>
    pdfDoc && currentPage < pdfDoc.numPages && setCurrentPage(currentPage + 1);
  const prevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  return (
    <div className="w-100">
      <div className="d-flex justify-content-between mb-2">
        <button
          className="btn btn-outline-light btn-sm"
          onClick={prevPage}
          disabled={currentPage <= 1}
        >
          Previous
        </button>
        <button
          className="btn btn-outline-light btn-sm"
          onClick={nextPage}
          disabled={pdfDoc ? currentPage >= pdfDoc.numPages : true}
        >
          Next
        </button>
      </div>
      <div className="d-flex justify-content-center">
        <canvas
          ref={canvasRef}
          style={{
            maxWidth: "100%",
            height: "auto",
            border: "1px solid #ccc",
            backgroundColor: "#fff",
          }}
        />
      </div>
    </div>
  );
}
