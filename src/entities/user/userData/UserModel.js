import { DataTypes } from "sequelize";
import db from "../../../db/dbConfig.js";
import Store from "../../store/storeModel.js";

const User = db.define('user', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  store_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  country: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  province: {
    type: DataTypes.STRING,
    allowNull: true,
  }
},{
  timestamps: true,
  underscored: true,
});


User.hasOne(Store, { foreignKey: 'store_id' });


export default User;
