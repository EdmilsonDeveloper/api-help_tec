import { IsBoolean, IsDate, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";
import { IsCpf } from "src/shared/utils/is-cpf.decorator";

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsString()
  @IsOptional()
  genero?: string;

  @IsString()
  @IsNotEmpty()
  @IsCpf({ message: 'O CPF informado é inválido' })
  cpf: string;

  @IsString()
  @IsNotEmpty()
  rg: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  senha: string;

  @IsDate()
  @IsNotEmpty()
  data_nascimento: Date;

  @IsString()
  @IsOptional()
  telefone?: string;

  @IsString()
  @IsNotEmpty()
  celular: string;

  @IsString()
  @IsNotEmpty()
  endereco_1: string;

  @IsString()
  @IsOptional()
  endereco_2?: string;

  @IsBoolean()
  @IsNotEmpty()
  prestador: boolean;

  @IsBoolean()
  @IsNotEmpty()
  noturno: boolean;

  @IsBoolean()
  @IsNotEmpty()
  cliente: boolean;

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  id_plano_adesao: string;
}
