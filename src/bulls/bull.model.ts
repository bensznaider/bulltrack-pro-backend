import {
  Column,
  DataType,
  Index,
  Model,
  Table,
  AutoIncrement,
  PrimaryKey,
} from 'sequelize-typescript';
import { HasMany } from 'sequelize-typescript';
import { Favorite } from '../favorites/favorite.model';
import type {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  NonAttribute,
} from 'sequelize';

@Table({ tableName: 'bulls', timestamps: true })
export class Bull extends Model<
  InferAttributes<Bull>,
  InferCreationAttributes<Bull>
> {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER })
  declare id: CreationOptional<number>;

  @Index
  @Column({ type: DataType.STRING, allowNull: false })
  declare caravana: string;

  @Index
  @Column({ type: DataType.STRING, allowNull: false })
  declare nombre: string;

  @Index
  @Column({ type: DataType.STRING, allowNull: false })
  declare uso: 'vaquillona' | 'vaca';

  @Index
  @Column({ type: DataType.STRING, allowNull: false })
  declare origen: 'propio' | 'catalogo';

  @Index
  @Column({ type: DataType.STRING, allowNull: false })
  declare pelaje: 'negro' | 'colorado';

  @Column({ type: DataType.STRING, allowNull: false })
  declare raza: string;

  @Column({ field: 'edad_meses', type: DataType.INTEGER, allowNull: false })
  declare edadMeses: number;

  @Column({
    field: 'caracteristica_destacada',
    type: DataType.STRING,
    allowNull: true,
  })
  declare caracteristicaDestacada: string | null;

  // stats (stored as columns for fast server-side filtering/sorting)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare crecimiento: number;

  @Column({
    field: 'facilidad_parto',
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare facilidadParto: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  declare reproduccion: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  declare moderacion: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  declare carcasa: number;

  @HasMany(() => Favorite)
  declare favorites?: NonAttribute<Favorite[]>;

  declare isFavorite?: NonAttribute<boolean>;
}
