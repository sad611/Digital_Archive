/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  Body,
  Controller,
  Get,
  Post,
  UnauthorizedException,
  UseGuards,
  Request,
  BadRequestException,
  ConflictException,
} from "@nestjs/common";
import { AuthService } from "../services/auth/auth.service";
import { AuthGuard } from "@nestjs/passport";
import { Prisma } from "@prisma/client";
import { UserService } from "src/services/user/user.service";

@Controller("auth")
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post("login")
  async login(@Body() body: { login: string; password: string }) {
    const user = await this.authService.validateUser(body.login, body.password);
    if (!user) {
      throw new UnauthorizedException("Invalid credentials");
    }
    return this.authService.login(user);
  }

  @Post("register")
  async register(@Body() data: { login: string; password: string }) {
    const { login, password } = data;

    if (!login || !password) {
      throw new BadRequestException("Login and password is required.");
    }

    try {
      const user = await this.userService.registerUser(login, password);
      return this.authService.login(user);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw new ConflictException("Login already exists.");
        }
      }
      throw error;
    }
  }

  @UseGuards(AuthGuard("jwt"))
  @Get("validate-token")
  validateToken(@Request() req) {
    if (!req.user) {
      throw new UnauthorizedException("Token has expired or is invalid");
    }

    return { message: "Token is valid", user: req.user };
  }
}
