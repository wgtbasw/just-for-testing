import { Model, DataTypes } from 'sequelize';
import sequelize from '../db';
import User from './User';

class Project extends Model {
  public id!: number;
  public name!: string;
  public userId!: number;
}

Project.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'projects',
});

User.hasMany(Project, { foreignKey: 'userId' });
Project.belongsTo(User, { foreignKey: 'userId' });

export default Project;
