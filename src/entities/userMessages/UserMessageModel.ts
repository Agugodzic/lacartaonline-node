import { DataTypes, Model } from 'sequelize';
import db from '../../db/dbConfig';
import User from '../user/userData/UserModel';


interface userMessageAttributes {
  id?: number;
  userid: number;
  title: string;
  message: string;
  createdAt?: Date;
  updatedAt?: Date;
}

class userMessage extends Model<userMessageAttributes> implements userMessageAttributes {
  public id!: number;
  public userid!: number;
  public title!: string;
  public message!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate() {
    this.belongsTo(User, {
      as: 'user',
      foreignKey: 'userid',
    });
  }
}

userMessage.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userid: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: 'userMessage',
    tableName: 'userMessages',
    timestamps: true, // Crea automáticamente createdAt y updatedAt
  }
);

export default userMessage;