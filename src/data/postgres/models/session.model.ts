import { Column, CreatedAt, DataType, Default, Model, PrimaryKey, Sequelize, Table, UpdatedAt } from "sequelize-typescript";
import { Usuarios } from "./user.model";

@Table({
    tableName: 'secao',
    timestamps: false
})
export class Secao extends Model<Secao> {
    @PrimaryKey
    @Default(Sequelize.literal('uuid_generate_v4()'))
    @Column(DataType.UUID)
    id_secao: string;

    @Column(DataType.STRING)
    token: string;

    @Default(true)
    @Column(DataType.BOOLEAN)
    ativo: boolean;

    @Column({
        type: DataType.UUID,
        references: {
            model: Usuarios,
            key: 'id_usuario'
        }
    })
    id_usuario: string;

    @Column(DataType.STRING(10))
    plataforma: string;

    @CreatedAt
    @Column(DataType.DATE)
    created_at: Date;

    @UpdatedAt
    @Column(DataType.DATE)
    updated_at: Date;
}