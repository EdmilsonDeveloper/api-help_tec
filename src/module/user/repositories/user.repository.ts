import { InjectModel } from '@nestjs/sequelize';
import { UserContract, userQueryOptions } from './user.contract';
import { Usuarios } from 'src/data/postgres/models/user.model';
import { User } from '../entities/user.entity';
import { UpdateUserDto } from '../dto/update-user.dto';

export class UserRepository implements UserContract {
  constructor(
    @InjectModel(Usuarios)
    private readonly model: typeof Usuarios,
  ) {}

  async get(user: userQueryOptions): Promise<User> {
    try {
      return await this.model.findOne({
        where: { id_usuario: user.id_usuario },
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async create(user: User): Promise<User> {
    try {
      return await this.model.create(user);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async update(id_usuario: string, update: UpdateUserDto): Promise<number[]> {
    try {
      return await this.model.update(update, { where: { id_usuario } });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
