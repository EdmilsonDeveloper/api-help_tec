import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthRepository } from './repositories/auth.repository';
import { Auth } from './entities/auth.entity';
import { CreateAuthDto } from './dto/create-auth.dto';
import { Platform } from './dto/types';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/module/user/user.service';

@Injectable()
export class AuthService {
  private jwtExpirationTimeInSeconds: number;
  private jwtSecret: string;
  constructor(
    private readonly repository: AuthRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    this.jwtSecret = this.configService.get<string>('JWT_SECRET');
    this.jwtExpirationTimeInSeconds =
      +this.configService.get<number>('JWT_EXPIRATION_TIME') || 18000;
  }

  async create(body: CreateAuthDto, platform: Platform): Promise<Auth> {
    if (!body.email) {
      throw new BadRequestException('Email é obrigatório!');
    }

    if (!platform) {
      throw new BadRequestException('Plataforma não identificada');
    }

    const auth = new Auth();
    auth.plataforma = platform;
    auth.created_at = new Date();
    auth.updated_at = new Date();
    try {
      const userAlreadyExists: any = {};
      if (!userAlreadyExists) {
        throw new UnauthorizedException('Email ou senha inválidos');
      }

      const isPasswordValid = await bcrypt.compare(
        body.password,
        userAlreadyExists.password,
      );

      if (!isPasswordValid) {
        throw new UnauthorizedException('Usuário ou senha incorretos');
      }

      const activeSession = await this.userService.get({
        ativo: true,
        id_usuario: userAlreadyExists.id_usuario,
      });

      if (activeSession) {
        await this.repository.update(userAlreadyExists.id_usuario, {
          ativo: false,
        });
      }

      const payload = {
        id_usuario: userAlreadyExists.id_usuario,
        platform: platform,
      };
      const token = this.jwtService.sign(
        { payload },
        {
          secret: this.jwtSecret,
          expiresIn: this.jwtExpirationTimeInSeconds,
        },
      );

      auth.token = token;
      auth.id_usuario = userAlreadyExists.id_usuario;

      const session = await this.repository.create(auth);
      return session;
    } catch (error) {}
  }
}
