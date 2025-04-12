import { Module } from "@nestjs/common";
import { ArchivematicaController } from "./archivematica.controller";
import { PrismaService } from "../services/prisma/prisma.service";
import { UserService } from "../services/user/user.service";

@Module({
  controllers: [ArchivematicaController],
  providers: [PrismaService, UserService],
})
export class ArchivematicaModule {}
