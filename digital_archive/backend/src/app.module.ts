import { Module } from "@nestjs/common";

import { ArchivematicaModule } from "./archivematica/archivematica.module";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { JwtCoreModule } from "./jwt-core/jwt-core.module";
import { ConfigModule } from "@nestjs/config";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtCoreModule,
    AuthModule,
    UserModule,
    ArchivematicaModule,
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), "public/docs"),
      serveRoot: "/docs",
    }),
  ],
})
export class AppModule {}
