/* eslint-disable react/jsx-no-undef */
import { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import Pdfjs from "../../../PdfViewer/PdfViewer";
import src from "@emotion/styled";
import { Document, Page } from "react-pdf";

interface UploadModalProps {
  show: boolean;
  onHide: () => void;
  onSubmit: (data: any) => void;
}
const UploadDocumentDialog: React.FC<UploadModalProps> = ({
  show,
  onHide,
  onSubmit,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [area, setArea] = useState("");
  const [documentOrigin, setDocumentOrigin] = useState("");
  const [version, setVersion] = useState("");
  const [keywords, setKeywords] = useState<string[]>([]);
  const [validated, setValidated] = useState(false);

  const pdfUrl = "http://localhost:3000/archivematica/files";

  useEffect(() => {
    if (show) {
      setFile(null);
      setArea("");
      setDocumentOrigin("");
      setVersion("");
      setKeywords([]);
      setValidated(false); 
    }
  }, [show]);

  const handleSubmit = (event: React.FormEvent) => {
    const form = event.currentTarget as HTMLFormElement;
    if (!form.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);

    if (form.checkValidity()) {
      handleSave();
    }
  };

  const [currentPage, setCurrentPage] = useState(1);

  const handleSave = () => {
    onSubmit({ file, area, documentOrigin, version, keywords });
  };

  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : 1));
  };

  return (
    <Modal show={show} onHide={onHide} centered>
  <Modal.Body>
    <Document file={file}>
      <Page pageNumber={currentPage} width={600} />
    </Document>
    <div>
      <button onClick={prevPage}>Anterior</button>
      <button onClick={nextPage}>Próxima</button>
    </div>
  </Modal.Body>
</Modal>
  );
};

export default UploadDocumentDialog;
