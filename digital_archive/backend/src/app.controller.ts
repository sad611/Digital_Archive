import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Get,
  HttpStatus,
  Post,
} from "@nestjs/common";
import { AppService } from "./app.service";
import { UserService } from "./services/user/user.service";
import { Prisma } from "@prisma/client";

@Controller("api")
export class AppController {
  constructor(
    private readonly appService: AppService,
    private userService: UserService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
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
      await this.userService.createUser(login, password);
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
