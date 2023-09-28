import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import db from '.';

class TeamsSequelize extends Model
  <InferAttributes<TeamsSequelize>, InferCreationAttributes<TeamsSequelize>> {
  declare id: CreationOptional<number>;
  declare teamName: string;
}

TeamsSequelize.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },

  teamName: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'teams',
  timestamps: false,
  underscored: true,
});

export default TeamsSequelize;
