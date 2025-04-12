import { Controller, Get } from "@nestjs/common";

@Controller("archivematica")
export class ArchivematicaController {
  @Get()
  getHello(): string {
    return "Hello";
  }
}
