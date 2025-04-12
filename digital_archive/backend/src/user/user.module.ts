import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { PrismaService } from "../services/prisma/prisma.service";
import { UserService } from "../services/user/user.service";

@Module({
  controllers: [UserController],
  providers: [PrismaService, UserService],
})
export class UserModule {}
