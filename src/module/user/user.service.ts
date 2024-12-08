import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { User } from './entities/user.entity';
import { userQueryOptions } from './repositories/user.contract';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly repository: UserRepository) {}

  async get(options: userQueryOptions): Promise<User> {
    try {
      const user = await this.repository.get({
        id_usuario: options.id_usuario,
      });
      if (!user) {
        throw new NotFoundException('Usuário nao encontrado');
      }
      return user;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async create(body: CreateUserDto): Promise<User> {
    const user = new User();
    user.nome = body.nome;
    user.genero = body.genero;
    user.cpf = body.cpf;
    user.rg = body.rg;
    user.email = body.email;
    user.senha = body.senha;
    user.data_nascimento = body.data_nascimento;
    user.telefone = body.telefone;
    user.celular = body.celular;
    user.endereco_1 = body.endereco_1;
    user.endereco_2 = body.endereco_2;
    user.prestador = body.prestador;
    user.noturno = body.noturno;
    user.cliente = body.cliente;
    user.id_plano_adesao = body.id_plano_adesao;
    user.created_at = new Date();
    user.updated_at = new Date();
    try {
      const cpfAlreadyExists = await this.repository.get({ cpf: user.cpf });
      if (cpfAlreadyExists) {
        throw new BadRequestException('CPF ja cadastrado');
      }

      const rgAlreadyExists = await this.repository.get({ rg: user.rg });
      if (rgAlreadyExists) {
        throw new BadRequestException('RG ja cadastrado');
      }

      const emailAlreadyExists = await this.repository.get({ email: user.email });
      if (emailAlreadyExists) {
        throw new BadRequestException('Email ja cadastrado');
      }

      if (user.genero) {
        if (user.genero !== 'M' && user.genero !== 'F') {
          user.genero = 'I';
        }
      }

      if (!user.prestador && !user.cliente) {
        user.cliente = true;
      }

      if (!user.cliente && user.prestador === true) {
        user.cliente = false;
      }

      if (user.cliente === false) {
        delete user.id_plano_adesao;
      }

      return await this.repository.create(user);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
