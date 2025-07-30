import { Model, DataTypes } from 'sequelize';
import sequelize from '../db';

class User extends Model {
  public id!: number;
  public email!: string;
  public passwordHash!: string;
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  passwordHash: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'users',
});

export default User;
