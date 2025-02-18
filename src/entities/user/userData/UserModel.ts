import { DataTypes, Model } from 'sequelize';
import db from '../../../db/dbConfig.ts';
import Plan from '../../plan/PlanModel.ts';

interface UserAttributes {
  id?: number;
  name: string;
  country: string;
  phone: string;
  email: string;
  province: string | null;
  planid: number | null;
  activeSubscription: boolean;
}

class User extends Model<UserAttributes> implements UserAttributes {
  public id!: number;
  public name!: string;
  public country!: string;
  public phone!: string;
  public email!: string;
  public province!: string | null;
  public planid!: number | null;
  public activeSubscription!: boolean;

  static initModel() {
    this.init({
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
      activeSubscription: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      planid: {
        type: DataTypes.INTEGER,
        allowNull: true,
      }
    }, {
      sequelize: db,
      modelName: 'User',
      timestamps: true,
      underscored: true,
    });
  }

  public static associate(): void {
    this.belongsTo(Plan, {
      as: 'plan', foreignKey: 'planid'
    });
  }
}


User.initModel();

export default User;
