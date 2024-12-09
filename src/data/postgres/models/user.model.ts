import {
  Column,
  CreatedAt,
  DataType,
  Default,
  Model,
  PrimaryKey,
  Sequelize,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';

@Table({
  tableName: 'usuarios',
  timestamps: false,
})
export class Usuarios extends Model<Usuarios> {
  @PrimaryKey
  @Default(Sequelize.literal('uuid_generate_v4()'))
  @Column(DataType.UUID)
  id_usuario: string;

  @Default(true)
  @Column(DataType.BOOLEAN)
  ativo: boolean;

  @Column({type: DataType.STRING(100), allowNull: false})
  nome: string;

  @Default('I')
  @Column(DataType.STRING(1))
  genero: string;

  @Column({
    type: DataType.STRING(11),
    unique: true,
    allowNull: false,
  })
  cpf: string;

  @Column({
    type: DataType.STRING(7),
    unique: true,
    allowNull: false,
  })
  rg: string;

  @Column({
    type: DataType.STRING(150),
    unique: true,
    allowNull: false,
  })
  email: string;

  @Column({type: DataType.STRING(100), allowNull: false})
  senha: string;

  @Column({type: DataType.DATE, allowNull: false})
  data_nascimento: Date;

  @Column(DataType.STRING(11))
  telefone: string;

  @Column(DataType.STRING(20))
  celular: string;

  @Column({type: DataType.STRING(255), allowNull: false})
  endereco_1: string;

  @Column(DataType.STRING(255))
  endereco_2: string;

  @Column(DataType.BOOLEAN)
  prestador: boolean;

  @Default(false)
  @Column(DataType.BOOLEAN)
  noturno: boolean;

  @Column(DataType.BOOLEAN)
  cliente: boolean;

  @Column(DataType.UUID)
  id_plano_adesao: string;

  @CreatedAt
  @Column({type: DataType.DATE, allowNull: false})
  created_at: Date;

  @UpdatedAt
  @Column(DataType.DATE)
  updated_at: Date;
}
