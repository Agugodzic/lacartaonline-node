import { DataTypes, Model } from 'sequelize';
import db from '../../db/dbConfig.ts';

class Variants extends Model {
  public id!: number;
  public storeid!: number;
  public productid!: number;
  public variant1!: string | null;
  public price1!: number | null;
  public variant2!: string | null;
  public price2!: number | null;
  public variant3!: string | null;
  public price3!: number | null;
}

Variants.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    storeid: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    productid: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    variant1: {
      type: DataTypes.STRING,
    },
    price1: {
      type: DataTypes.FLOAT,
    },
    variant2: {
      type: DataTypes.STRING,
    },
    price2: {
      type: DataTypes.FLOAT,
    },
    variant3: {
      type: DataTypes.STRING,
    },
    price3: {
      type: DataTypes.FLOAT,
    },
  },
  {
    sequelize: db,
    modelName: 'Variants',
    timestamps: false,
  }
);

export default Variants;
