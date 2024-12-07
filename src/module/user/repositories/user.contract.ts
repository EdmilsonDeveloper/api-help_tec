import { User } from '../entities/user.entity';

export class userQueryOptions {
  id_usuario?: string;
  ativo?: boolean;
  page?: number;
  limit?: number;
}

export interface UserContract {
  get(user: userQueryOptions): Promise<User>;
}
