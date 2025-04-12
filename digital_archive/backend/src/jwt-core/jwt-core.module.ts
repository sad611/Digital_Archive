import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";

// jwt.module.ts
@Module({
  imports: [
    JwtModule.register({
      secret: process.env.ENCRYPT_KEY!,
      signOptions: { expiresIn: "1h" },
    }),
  ],
  exports: [JwtModule],
})
export class JwtCoreModule {}
