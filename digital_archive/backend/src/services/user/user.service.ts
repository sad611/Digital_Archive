/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { User } from "@prisma/client";
import * as bcrypt from "bcrypt";

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async registerUser(login: string, password: string) {
    const saltOrRounds = 10;

    const hashedPassword: string = await bcrypt.hash(password, saltOrRounds);

    const user = await this.prisma.user.create({
      data: {
        login,
        password: hashedPassword,
      },
    });

    return user;
  }

  async getAllUsers() {
    return this.prisma.user.findMany();
  }

  async deleteAllUsers() {
    return this.prisma.user.deleteMany();
  }

  async findByLogin(login: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { login } });
  }
}
