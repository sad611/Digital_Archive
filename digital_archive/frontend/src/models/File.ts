export interface File {
  id: string;
  name: string;
  preservationDate: Date;
  preservationStatus: "Iniciada" | "Preservado" | "Falha";
  area: string;
  documentOrigin: string;
  version: string;
  keywords: string[];
  aipId?: string;
  dipUrl?: string;
}
