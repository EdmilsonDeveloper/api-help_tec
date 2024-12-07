import { Auth } from '../entities/auth.entity';

export interface AuthContract {
  create(auth: Auth): Promise<Auth>;
}
