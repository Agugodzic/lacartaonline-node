import { DataTypes, Model } from "sequelize";
import db from "../../../db/dbConfig.ts";

interface UserCredentialsAttributes {
  id?: number;
  userId: number | null;
  user: string;
  password: string;
  keep_connected?: boolean;
  reset_password_token?: string | null;
  reset_password_expires?: Date | null;
}

class UserCredentials
  extends Model<UserCredentialsAttributes>
  implements UserCredentialsAttributes
{
  public id!: number;
  public userId!: number | null;
  public user!: string;
  public password!: string;
  public keep_connected!: boolean;
  public reset_password_token!: string | null;
  public reset_password_expires!: Date | null;

  static associate() {
    // Define las asociaciones con otros modelos si es necesario
  }
}
UserCredentials.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
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
    reset_password_token: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    reset_password_expires: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize: db,
    modelName: "UserCredentials",
    timestamps: true,
    underscored: true,
  }
);

export default UserCredentials;
