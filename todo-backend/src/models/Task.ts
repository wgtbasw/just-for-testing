import { Model, DataTypes } from 'sequelize';
import sequelize from '../db';
import User from './User';
import Project from './Project';

class Task extends Model {
  public id!: number;
  public title!: string;
  public description?: string;
  public dueDate?: Date;
  public priority!: 'low' | 'medium' | 'high';
  public status!: 'todo' | 'inprogress' | 'done';
  public userId!: number;
  public projectId?: number;
}

Task.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  dueDate: {
    type: DataTypes.DATE,
  },
  priority: {
    type: DataTypes.ENUM('low', 'medium', 'high'),
    defaultValue: 'medium',
  },
  status: {
    type: DataTypes.ENUM('todo', 'inprogress', 'done'),
    defaultValue: 'todo',
  },
}, {
  sequelize,
  tableName: 'tasks',
});

User.hasMany(Task, { foreignKey: 'userId' });
Task.belongsTo(User, { foreignKey: 'userId' });

Project.hasMany(Task, { foreignKey: 'projectId' });
Task.belongsTo(Project, { foreignKey: 'projectId' });

export default Task;
