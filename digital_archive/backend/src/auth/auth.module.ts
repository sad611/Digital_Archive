// auth.module.ts
import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { AuthController } from "./auth.controller";
import { AuthService } from "src/services/auth/auth.service";
import { UserService } from "src/services/user/user.service";
import { PrismaService } from "src/services/prisma/prisma.service";
import { JwtCoreModule } from "../jwt-core/jwt-core.module";

@Module({
  imports: [JwtCoreModule, PassportModule],
  controllers: [AuthController],
  providers: [AuthService, UserService, PrismaService],
})
export class AuthModule {}