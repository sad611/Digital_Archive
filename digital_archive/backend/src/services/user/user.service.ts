import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(login: string, password: string) {
    return this.prisma.user.create({
      data: { login, password },
    });
  }

  async getAllUsers() {
    return this.prisma.user.findMany();
  }

  async deleteAllUsers() {
    return this.prisma.user.deleteMany();
  }
}
