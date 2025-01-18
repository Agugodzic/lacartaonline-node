import { DataTypes, Model } from 'sequelize';
import db from '../../../db/dbConfig.ts';

interface UserAttributes {
  id?: number;
  name: string;
  country: string;
  phone: string;
  email: string;
  province: string | null;
  plan: number | null;
}

class User extends Model<UserAttributes> implements UserAttributes {
  public id!: number;
  public name!: string;
  public country!: string;
  public phone!: string;
  public email!: string;
  public province!: string | null;
  public plan!: number | null;

  static associate() {
    // Define las asociaciones con otros modelos si es necesario
  }
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
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
  },
  province: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  plan: {
    type: DataTypes.INTEGER,
    allowNull: true,
  }
}, {
  sequelize: db,
  modelName: 'User',
  timestamps: true,
  underscored: true,
});

export default User;
