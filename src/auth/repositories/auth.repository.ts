import { InjectModel } from '@nestjs/sequelize';
import { Auth } from '../entities/auth.entity';
import { AuthContract } from './auth.contract';
import { Secao } from 'src/data/postgres/models/session.model';
import { updateAuthDto } from '../dto/update-auth.dto';

export class AuthRepository implements AuthContract {
  constructor(
    @InjectModel(Secao)
    private readonly model: typeof Secao,
  ) {}

  async create(auth: Auth): Promise<Auth> {
    try {
        return await this.model.create(auth);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async update(id_usuario: string, update: updateAuthDto): Promise<number[]> {
    try {
      return await this.model.update(update, { where: { id_usuario } });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
