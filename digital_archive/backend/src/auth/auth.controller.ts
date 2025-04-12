import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "../services/auth/auth.service";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("login")
  async login(@Body() body: { login: string; password: string }) {
    console.log({ body });
    const user = await this.authService.validateUser(body.login, body.password);
    if (!user) {
      throw new Error("Invalid credentials");
    }
    return this.authService.login(user);
  }
}
