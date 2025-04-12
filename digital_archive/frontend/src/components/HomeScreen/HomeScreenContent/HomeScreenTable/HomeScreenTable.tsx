import React, { useState } from "react";
import { Button, ButtonGroup, Table } from "react-bootstrap";
import { File } from "../../../../models/File";
import styles from "./HomeScreenTable.module.css";

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
  const totalPages = Math.ceil(files.length / itemsPerPage);
  console.log(totalPages);

  const currentFiles = files.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

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
                    <button
                      className={`${styles["pagination-btn"]} text-light px-3 rounded-pill shadow-none`}
                    >
                      Open
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>

      {/* Pagination Controls */}
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
    </div>
  );
};

export default HomeScreenTable;
