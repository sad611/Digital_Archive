import { Controller, Get, Header, Param, Res } from "@nestjs/common";
import { Response } from "express";
import { createReadStream } from "fs";
import { join } from "path";
import { ArchivematicaService } from "src/services/archivematica/archivematica.service";

@Controller("archivematica")
export class ArchivematicaController {
  constructor(private archivematicaService: ArchivematicaService) {}
  @Get()
  getHello(): any {
    const data = {
      name: "Sample Transfer",
      type: "standard",
      accession: "ACC12345",
      paths: [
        "NWJiYWJjMTMtMTIyNy00MWE3LWIwY2QtZjJhYzM1MjkxZTdmOi92YWdyYW50L3NhbXBsZWRhdGEvQ1NWbWV0YXRhdGE",
        "NWJiYWJjMTMtMTIyNy00MWE3LWIwY2QtZjJhYzM1MjkxZTdmOi92YWdyYW50L3NhbXBsZWRhdGEvQ1NWbWV0YXRhdGE",
      ],
      row_ids: [""],
    };
    const result = this.archivematicaService.getUnapprovedTransfers();
    return result;
  }
  @Get("files/:fileName")
  @Header("Content-Type", "application/pdf")
  @Header("Content-Disposition", 'inline; filename="Atropos.pdf"')
  getFile(@Res() res: Response, @Param("fileName") fileName: string): void {
    const filePath = join(process.cwd(), `public/docs/${fileName}`);
    const fileStream = createReadStream(filePath);
    fileStream.pipe(res);
  }
}
