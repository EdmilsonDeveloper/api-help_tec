import { Body, Controller, Post, Req } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateAuthDto } from './dto/create-auth.dto';
import { AuthService } from './auth.service';
import { RequestWithPlatformHeader } from 'src/shared/dtos/types';
import { ConfigService } from '@nestjs/config';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Login' })
  async create(
    @Req() req: RequestWithPlatformHeader,
    @Body() body: CreateAuthDto,
  ) {
    const auth = await this.authService.create(body, req.headers.platform);
    return {
      statusCode: 200,
      message: 'Login efetuado com sucesso',
      data: {
        token: auth.token,
        expiresIn: +this.configService.get<number>('JWT_EXPIRATION_TIME') || 18000,
      },
    };
  }
}
