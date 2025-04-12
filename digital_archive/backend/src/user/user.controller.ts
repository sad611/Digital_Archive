import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Get,
  HttpStatus,
  Post,
} from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { UserService } from "../services/user/user.service";

@Controller("user")
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getHello(): string {
    return "Hello";
  }

  @Post("register")
  async skipBack(@Body() data: { login: string; password: string }) {
    const { login, password } = data;

    if (!login || !password) {
      throw new BadRequestException(
        "Login and password query parameter is required.",
      );
    }
    try {
      await this.userService.registerUser(login, password);
      return {
        statusCode: HttpStatus.OK,
        message: "User created successfully",
      };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw new ConflictException("Login already exists.");
        }
      }
      throw error;
    }
  }

  @Get("users")
  async getAllUsers() {
    const users = await this.userService.getAllUsers();
    return users;
  }
}
