import { DataTypes, Model } from 'sequelize';
import db from '../../db/dbConfig';
import Variants from '../variants/VariantsModel';
import Category from '../category/CategoryModel';

interface ProductAttributes {
  id: number;
  categoryid: number;
  storeid: number;
  unitprice: number;
  productname: string;
  description: string;
  withVariants: boolean;
  image: string;
}

class Product extends Model<ProductAttributes> implements ProductAttributes {
  public id!: number;
  public categoryid!: number;
  public storeid!: number;
  public unitprice!: number;
  public productname!: string;
  public description!: string;
  public withVariants!: boolean;
  public image!: string;

  static associate() {
    this.hasOne(Variants, {
      as: 'variants',
      foreignKey: 'productid',
    });

    this.belongsTo(Category, {
      as: 'category',
      foreignKey: 'categoryid',
    });
  }
}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    categoryid: {
      type: DataTypes.INTEGER,
    },
    storeid: {
      type: DataTypes.INTEGER,
    },
    unitprice: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    productname: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    withVariants: {
      type: DataTypes.BOOLEAN,
    },
    image: {
      type: DataTypes.TEXT('long'),
    },
  },
  {
    sequelize: db,
    modelName: 'Product',
  }
);

export default Product;
