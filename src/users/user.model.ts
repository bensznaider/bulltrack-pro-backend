import { Column, DataType, Model, Table, Unique } from 'sequelize-typescript';
import { HasMany } from 'sequelize-typescript';
import { Favorite } from '../favorites/favorite.model';
import type { NonAttribute } from 'sequelize';

@Table({ tableName: 'users', timestamps: true })
export class User extends Model {
  declare id: number;

  @Unique
  @Column({ type: DataType.STRING, allowNull: false })
  declare email: string;

  @Column({ field: 'password_hash', type: DataType.STRING, allowNull: false })
  declare passwordHash: string;

  @HasMany(() => Favorite)
  declare favorites?: NonAttribute<Favorite[]>;
}
