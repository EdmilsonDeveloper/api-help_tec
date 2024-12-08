import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { User } from './entities/user.entity';
import { userQueryOptions } from './repositories/user.contract';

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
}
