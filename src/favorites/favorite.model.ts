import {
  Column,
  DataType,
  ForeignKey,
  Index,
  Model,
  PrimaryKey,
  Table,
  AutoIncrement,
} from 'sequelize-typescript';
import { User } from '../users/user.model';
import { Bull } from '../bulls/bull.model';
import type {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize';

@Table({
  tableName: 'favorites',
  timestamps: false,
  indexes: [
    {
      //Composite index: a user cannot favorite the same bull twice
      name: 'favorites_user_bull_unique',
      unique: true,
      fields: ['user_id', 'bull_id'],
    },
  ],
})
export class Favorite extends Model<
  InferAttributes<Favorite>,
  InferCreationAttributes<Favorite>
> {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER })
  //Type is CreationOptional because it's auto-incremented by the database,
  //not expected to be provided when creating a new record
  declare id: CreationOptional<number>;

  @ForeignKey(() => User)
  @Index
  @Column({ field: 'user_id', type: DataType.INTEGER, allowNull: false })
  declare userId: number;

  @ForeignKey(() => Bull)
  @Index
  @Column({ field: 'bull_id', type: DataType.INTEGER, allowNull: false })
  declare bullId: number;
}
