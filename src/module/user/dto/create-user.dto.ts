export class CreateUserDto {
    name: string;
    genero: string;
    cpf: string;
    rg: string;
    email: string;
    senha: string;
    data_nascimento: Date;
    telefone?: string;
    celular: string;
    endereco_1: string;
    endereco_2?: string;
    prestador: boolean;
    noturno: boolean;
    cliente: boolean;
    id_plano_adesao: string;
}