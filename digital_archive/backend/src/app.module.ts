/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Module } from "@nestjs/common";

import { ArchivematicaModule } from "./archivematica/archivematica.module";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { JwtCoreModule } from "./jwt-core/jwt-core.module";
import { ConfigModule } from "@nestjs/config";
@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtCoreModule,
    AuthModule,
    UserModule,
    ArchivematicaModule,
  ],
})
export class AppModule {}
