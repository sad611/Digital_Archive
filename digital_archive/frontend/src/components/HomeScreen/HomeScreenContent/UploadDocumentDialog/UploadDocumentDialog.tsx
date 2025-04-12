import { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";

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

  const handleSave = () => {
    onSubmit({ file, area, documentOrigin, version, keywords });
  };

  return (
    <Modal show={show} onHide={onHide} centered >
      <Modal.Header closeButton className="text-light bg-darker border-0">
        <Modal.Title>Upload New Document</Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-darker text-light">
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formFile">
            <Form.Label className="text-light">PDF File</Form.Label>
            <Form.Control
              type="file"
              accept=".pdf"
              onChange={(e) =>
                setFile(
                  e.target instanceof HTMLInputElement &&
                    e.target.files &&
                    e.target.files[0]
                    ? e.target.files[0]
                    : null
                )
              }
              required
              className="bg-darker text-light"
            />
            <Form.Control.Feedback type="invalid">
              Please select a valid PDF file.
            </Form.Control.Feedback>
          </Form.Group>

          <Row className="mb-3">
            <Form.Group controlId="formArea">
              <Form.Label className="text-light">Area</Form.Label>
              <Form.Control
                value={area}
                onChange={(e) => setArea(e.target.value)}
                placeholder="Enter area"
                required
                className="bg-darker text-light border-secondary"
              />
              <Form.Control.Feedback type="invalid">
                Please provide an area.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formDocumentOrigin">
              <Form.Label className="text-light">Document Origin</Form.Label>
              <Form.Control
                value={documentOrigin}
                onChange={(e) => setDocumentOrigin(e.target.value)}
                placeholder="Enter document origin"
                required
                className="bg-darker text-light border-secondary"
              />
              <Form.Control.Feedback type="invalid">
                Please provide a document origin.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group controlId="formVersion">
              <Form.Label className="text-light">Version</Form.Label>
              <Form.Control
                value={version}
                onChange={(e) => setVersion(e.target.value)}
                placeholder="Enter version"
                required
                className="bg-darker text-light border-secondary"
              />
              <Form.Control.Feedback type="invalid">
                Please provide a version.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formKeywords">
              <Form.Label className="text-light">Keywords</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={keywords.join(", ")}
                onChange={(e) =>
                  setKeywords(e.target.value.split(", ").map((kw) => kw.trim()))
                }
                placeholder="Enter keywords, separated by commas"
                required
                className="bg-darker text-light border-secondary"
              />
              <Form.Control.Feedback type="invalid">
                Please provide some keywords.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Modal.Footer className="bg-darker">
            <Button
              variant="secondary"
              onClick={onHide}
              className="text-light bg-secondary border-0"
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              type="submit"
              className="text-light bg-primary border-0"
            >
              Preserve
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default UploadDocumentDialog;
