import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  private jwtSecret: string;
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.jwtSecret = this.configService.get<string>('JWT_SECRET');
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const token = req.headers.authorization?.split(' ')[1];
    const tokenType = req.headers.authorization?.split(' ')[0].toLowerCase();

    if (!token || tokenType !== 'bearer') {
      throw new UnauthorizedException({
        message: 'Token inválido',
        error: 'Unauthorized',
        statusCode: HttpStatus.UNAUTHORIZED,
      });
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.jwtSecret,
      });

      if (!payload) {
        throw new UnauthorizedException({
          message: 'Token inválido',
          error: 'Unauthorized',
          statusCode: HttpStatus.UNAUTHORIZED,
        });
      }

      req.auth = {
        employee: payload.id_usuario,
        platform: payload.platform,
        token: token,
      };

      return true;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
