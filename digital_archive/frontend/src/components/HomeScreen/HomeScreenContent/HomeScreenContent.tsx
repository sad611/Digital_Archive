import React, { useState } from "react";
import CustomNavBar from "../NavBar/CustomNavBar";
import HomeScreenTable from "./HomeScreenTable/HomeScreenTable";
import HomeScreenInputs from "./HomeScreenInputs/HomeScreenInputs";
import { Button } from "react-bootstrap";
import UploadDocumentDialog from "./UploadDocumentDialog/UploadDocumentDialog";
import { File } from "../../../models/File";

interface HomeScreenContentProps {
  show: boolean;
  onShow: (value: boolean) => void;
}

const mockFiles: File[] = [
  {
    id: "1",
    name: "documento_1.pdf",
    preservationDate: new Date("2024-01-15"),
    preservationStatus: "Preservado",
    area: "Jurídico",
    documentOrigin: "Sistema Interno",
    version: "1.0",
    keywords: ["contrato", "confidencial", "cliente"]
  },
  {
    id: "2",
    name: "relatorio_financeiro.xlsx",
    preservationDate: new Date("2023-12-01"),
    preservationStatus: "Falha",
    area: "Financeiro",
    documentOrigin: "Planilha Externa",
    version: "2.3",
    keywords: ["financeiro", "relatório", "mensal"]
  },
  {
    id: "3",
    name: "apresentacao_ano_novo.pptx",
    preservationDate: new Date("2024-03-10"),
    preservationStatus: "Iniciada",
    area: "Marketing",
    documentOrigin: "Drive",
    version: "0.9",
    keywords: ["apresentação", "campanha", "marketing"]
  },
  {
    id: "4",
    name: "registro_colaboradores.csv",
    preservationDate: new Date("2024-02-25"),
    preservationStatus: "Preservado",
    area: "Recursos Humanos",
    documentOrigin: "RH Digital",
    version: "1.2",
    keywords: ["funcionários", "dados", "registro"]
  },
  {
    id: "5",
    name: "manual_tecnico.docx",
    preservationDate: new Date("2024-01-05"),
    preservationStatus: "Preservado",
    area: "TI",
    documentOrigin: "Documentação Técnica",
    version: "3.1",
    keywords: ["manual", "sistema", "configuração"]
  }
];


const HomeScreenContent: React.FC<HomeScreenContentProps> = ({
  show,
  onShow,
}) => {
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [files, setFiles] = useState<File[]>(mockFiles);

  const handleSubmit = (data: any) => {
    console.log("Submitted:", data);
  };

  return (
    <div className="d-flex flex-column vh-100 px-1">
      <CustomNavBar show={show} onShow={onShow} />
      <div className="text-light p-3 bg-darker rounded mt-2 flex-grow-1">
        <div className="mx-3 d-flex flex-row justify-content-between align-items-center">
          <HomeScreenInputs />
          <div>
            <Button
              variant="secondary"
              className="btn btn-sm"
              onClick={() => setShowUploadDialog(true)}
            >
              Upload
            </Button>
            <UploadDocumentDialog
              show={showUploadDialog}
              onHide={() => setShowUploadDialog(false)}
              onSubmit={handleSubmit}
            />
          </div>
        </div>
        <HomeScreenTable files={files} />
      </div>
    </div>
  );
};

export default HomeScreenContent;
