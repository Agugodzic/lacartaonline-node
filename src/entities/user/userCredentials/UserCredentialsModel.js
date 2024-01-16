import DataTypes from "sequelize";
import db from "../../../db/dbConfig.js";

const UserCredentials = db.define('user_credentials', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue:0
  },
  user: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  keep_connected: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false, 
  },
}, {
  timestamps: true,
  underscored: true,
});


export default UserCredentials;

