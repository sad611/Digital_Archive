import { Controller, Get } from "@nestjs/common";
import { UserService } from "../services/user/user.service";

@Controller("user")
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getHello(): string {
    return "Hello";
  }

  @Get("users")
  async getAllUsers() {
    const users = await this.userService.getAllUsers();
    return users;
  }
}
