import { Column, CreatedAt, DataType, Default, Model, PrimaryKey, Sequelize, Table, UpdatedAt } from "sequelize-typescript";

@Table({
    tableName: 'servicos',
    timestamps: false
})
export class Servicos extends Model<Servicos> {
    @PrimaryKey
    @Default(Sequelize.literal('uuid_generate_v4()'))
    @Column(DataType.UUID)
    id_servico: string;

    @Column(DataType.STRING(50))
    nome: string;

    @Column(DataType.STRING(1000))
    descricao: string;

    @Column(DataType.FLOAT)
    preco_base: number;

    @CreatedAt
    @Column(DataType.DATE)
    created_at: Date;

    @Column(DataType.UUID)
    created_by: string;

    @UpdatedAt
    @Column(DataType.DATE)
    updated_at: Date;

    @Column(DataType.UUID)
    updated_by: string;
}