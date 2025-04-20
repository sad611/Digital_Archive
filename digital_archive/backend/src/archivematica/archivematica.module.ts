import { Module } from "@nestjs/common";
import { ArchivematicaController } from "./archivematica.controller";
import { PrismaService } from "../services/prisma/prisma.service";
import { UserService } from "../services/user/user.service";
import { ArchivematicaService } from "../services/archivematica/archivematica.service";
import { HttpModule } from "@nestjs/axios";
import { FilesController } from "./files/files.controller";

@Module({
  imports: [HttpModule],
  controllers: [ArchivematicaController, FilesController],
  providers: [PrismaService, UserService, ArchivematicaService],
})
export class ArchivematicaModule {}
