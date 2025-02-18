import { DataTypes, Model } from 'sequelize';
import db from '../../db/dbConfig';
import User from '../user/userData/UserModel';

interface CancellationAttributes {
  id?: number;
  userid: number;
  reason: string;
  createdAt?: Date;
  updatedAt?: Date;
}

class Cancellation extends Model<CancellationAttributes> implements CancellationAttributes {
  public id!: number;
  public userid!: number;
  public reason!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate() {
    this.belongsTo(User, {
      as: 'user',
      foreignKey: 'userid',
    });
  }
}

Cancellation.init(
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
    reason: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: 'Cancellation',
    tableName: 'cancellations',
    timestamps: true, // Crea automáticamente createdAt y updatedAt
  }
);

export default Cancellation;
