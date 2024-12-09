import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Busca um usuário pelo ID' })
  @ApiBearerAuth()
  async get(@Param('id') id: string) {
    const user = await this.userService.get({ id_usuario: id });
    return {
      statusCode: 200,
      message: 'Usuário encontrado com sucesso',
      data: user,
    };
  }

  @Post()
  async create(@Body() body: CreateUserDto) {
    await this.userService.create(body);
    return {
      statusCode: 201,
      message: 'Usuário criado com sucesso',
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: UpdateUserDto) {
    await this.userService.update(id, body);
    return {
      statusCode: 200,
      message: 'Usuário atualizado com sucesso',
    }
  }

  @Delete(':id')
  async softDelete(@Param('id') id: string) {
    await this.userService.update(id, { ativo: false });
    return {
      statusCode: 200,
      message: 'Usuário Apagado com sucesso',
    }
  }
  
}
