import { Injectable, StreamableFile } from "@nestjs/common";
import { Response } from "express";
import PDFDocument from "pdfkit";

@Injectable()
export class PdfService {
  //   generateDocument(res: Response): Promise<StreamableFile> {
  //     // Set headers so PDF is displayed inline
  //     res.set({
  //       "Content-Type": "application/pdf",
  //       "Content-Disposition": 'inline; filename="generated.pdf"',
  //     });
  //     const doc = new PDFDocument();
  //     doc.pipe(res);
  //     // Add your content here
  //     doc.fontSize(18).text("Generated PDF Document", { align: "center" });
  //     doc
  //       .moveDown()
  //       .fontSize(12)
  //       .text("This PDF was created on the server by pdfkit.");
  //     doc.end();
  //     return new StreamableFile(res);
  //   }
}
