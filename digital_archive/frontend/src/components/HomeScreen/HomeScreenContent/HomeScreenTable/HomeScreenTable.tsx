import React, { useState } from "react";
import { Table } from "react-bootstrap";
import { File } from "../../../../models/File";
import styles from "./HomeScreenTable.module.css";
import PdfJs from "../../../PdfViewer/PdfViewer";
import { downloadFileFromServer } from "../../../../services/downloadService";

interface HomeScreenTableProps {
  files: File[];
}

const statusStyles = {
  Preservado: styles["status-preservado"],
  Iniciada: styles["status-iniciada"],
  Falha: styles["status-falha"],
};

const HomeScreenTable: React.FC<HomeScreenTableProps> = ({ files }) => {
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [showPdfDialog, setShowPdfDialog] = useState(false);

  const [selectedFileName, setSelectedFileName] = useState("");
  const pdfUrl = "http://localhost:3000/archivematica/files";

  const totalPages = Math.ceil(files.length / itemsPerPage);
  console.log(totalPages);

  const currentFiles = files.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  function downloadFile(name: string): void {
    downloadFileFromServer(name);
  }

  return (
    <div className="d-flex flex-column bg-darker text-light my-3 rounded-4 shadow-sm p-4 overflow-auto">
      <div className="mb-4 d-flex justify-content-between align-items-center"></div>

      <div className="border border-secondary rounded-4 overflow-hidden">
        <div className="table-responsive">
          <Table
            hover
            responsive
            className="table bg-darker text-light table-borderless align-middle mb-0"
          >
            <thead>
              <tr>
                <th className="bg-secondary-subtle text-light text-uppercase small">
                  Id
                </th>
                <th className="bg-secondary-subtle text-light text-uppercase small">
                  Name
                </th>
                <th className="bg-secondary-subtle text-light text-uppercase small">
                  Preservation Date
                </th>
                <th className="bg-secondary-subtle text-light text-uppercase small">
                  Status
                </th>
                <th className="bg-secondary-subtle text-light text-uppercase small">
                  Area
                </th>
                <th className="bg-secondary-subtle text-light text-uppercase small">
                  Origin
                </th>
                <th className="bg-secondary-subtle text-light text-uppercase small">
                  Version
                </th>
                <th className="bg-secondary-subtle text-light text-uppercase small">
                  Keywords
                </th>
                <th className="bg-secondary-subtle text-light text-uppercase small">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {currentFiles.map((file, index) => (
                <tr key={file.id} className="border-top">
                  <td className="text-truncate">{file.id}</td>
                  <td className="text-truncate">{file.name}</td>
                  <td className="text-truncate">
                    {file.preservationDate.toLocaleDateString()}
                  </td>
                  <td className="text-truncate">
                    <span
                      className={`${styles["status-badge"]} ${
                        statusStyles[file.preservationStatus]
                      }`}
                    >
                      {file.preservationStatus}
                    </span>
                  </td>
                  <td className="text-truncate">{file.area}</td>
                  <td className="text-truncate">{file.documentOrigin}</td>
                  <td className="text-truncate">{file.version}</td>
                  <td className="text-truncate">{file.keywords.join(", ")}</td>
                  <td>
                    <div className="d-flex gap-2">
                      <button
                        onClick={() => {
                          setSelectedFileName(file.name);
                          setShowPdfDialog(true);
                        }}
                        className={`${styles["pagination-btn"]} text-light px-3 rounded-pill shadow-none`}
                      >
                        Open
                      </button>
                      <button
                        onClick={() => downloadFile(file.name)}
                        className={`${styles["pagination-btn"]} text-light px-3 rounded-pill shadow-none`}
                      >
                        Download
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>

      <nav className="mt-3">
        <div className="d-flex justify-content-center">
          <div className="d-flex flex-wrap gap-1 justify-content-center">
            <button
              className={`rounded ${styles["pagination-btn"]} ${
                currentPage === totalPages ? styles.disabled : ""
              } shadow-sm`}
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1 || totalPages === 0}
            >
              Previous
            </button>

            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                className={`rounded ${styles["pagination-btn"]} ${
                  currentPage === index + 1 ? styles.active : ""
                } shadow-sm`}
                onClick={() => handlePageChange(index + 1)}
                style={{
                  backgroundColor:
                    currentPage === index + 1 ? "#333333" : "transparent",
                  color: currentPage === index + 1 ? "#fff" : "#ccc",
                }}
              >
                {index + 1}
              </button>
            ))}

            <button
              className={`rounded ${styles["pagination-btn"]} ${
                currentPage === totalPages ? styles.disabled : ""
              } shadow-sm`}
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages || totalPages === 0}
            >
              Next
            </button>
          </div>
        </div>
      </nav>
      {showPdfDialog && selectedFileName && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
          style={{ backgroundColor: "rgba(0,0,0,0.6)", zIndex: 1050 }}
        >
          <div
            className="bg-dark rounded-4 shadow-lg d-flex flex-column"
            style={{ width: "80%", height: "85%" }}
          >
            <div className="d-flex justify-content-end gap-2 p-2 border-bottom border-secondary">
              <button
                className={`${styles["pagination-btn"]} text-light px-3 rounded-pill shadow-none btn btn-sm`}
                onClick={() => downloadFile(selectedFileName)}
              >
                Download
              </button>
              <button
                className={`${styles["pagination-btn"]} text-light px-3 rounded-pill shadow-none btn btn-sm`}
                onClick={() => setShowPdfDialog(false)}
              >
                Close
              </button>
            </div>
            <div className="flex-grow-1 overflow-auto">
              <PdfJs
                src={`${
                  process.env.REACT_APP_API_URL
                }/archivematica/files/${encodeURIComponent(selectedFileName)}`}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeScreenTable;
