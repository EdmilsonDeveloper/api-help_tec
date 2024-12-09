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
import { Usuarios } from './user.model';

@Table({
  tableName: 'secao',
  timestamps: false,
})
export class Secao extends Model<Secao> {
  @PrimaryKey
  @Default(Sequelize.literal('uuid_generate_v4()'))
  @Column(DataType.UUID)
  id_secao: string;

  @Column({
    type: DataType.STRING(255),
    unique: true,
    allowNull: false,
  })
  token: string;

  @Default(true)
  @Column(DataType.BOOLEAN)
  ativo: boolean;

  @Column({
    type: DataType.UUID,
    references: {
      model: Usuarios,
      key: 'id_usuario',
    },
  })
  id_usuario: string;

  @Column({type: DataType.STRING(10), allowNull: false})
  plataforma: string;

  @CreatedAt
  @Column({type: DataType.DATE, allowNull: false})
  created_at: Date;

  @UpdatedAt
  @Column(DataType.DATE)
  updated_at: Date;
}
