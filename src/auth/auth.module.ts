import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { UserService } from "src/module/user/user.service";
import { UserRepository } from "src/module/user/repositories/user.repository";

@Module({
    imports: [
        JwtModule.registerAsync({
            global: true,
            imports: [],
            useFactory: async (configService: ConfigService) => ({
              secret: configService.get<string>('JWT_SECRET'),
              signOptions: {
                expiresIn: +configService.get<number>('JWT_EXPIRATION_TIME') || 18000,
              },
            }),
            inject: [ConfigService],
          })
    ],
    controllers: [AuthModule],
    providers: [
      UserService,
      {
        provide: 'UserRepository',
        useClass: UserRepository
      }
    ],
})
export class AuthModule {}