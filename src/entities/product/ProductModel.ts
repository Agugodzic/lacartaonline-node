import { DataTypes, Model } from 'sequelize';
import db from '../../db/dbConfig';
import Variants from '../variants/VariantsModel';
import Category from '../category/CategoryModel';
import Store from '../store/storeModel';

interface ProductAttributes {
  id: number;
  categoryid: number;
  storeid: number;
  unitprice: number;
  productname: string;
  description: string;
  forDelivery: boolean;
  withVariants: boolean;
  image: string;
  enabled: boolean;
}

class Product extends Model<ProductAttributes> implements ProductAttributes {
  public id!: number;
  public categoryid!: number;
  public storeid!: number;
  public unitprice!: number;
  public productname!: string;
  public description!: string;
  public withVariants!: boolean;
  public forDelivery!: boolean;
  public image!: string;
  public enabled!: boolean;

  static associate() {
    this.hasOne(Variants, {
      as: 'variants',
      foreignKey: 'productid',
      onDelete: 'CASCADE',  // Elimina la variante cuando se elimina el producto
      hooks: true,
    });

    this.belongsTo(Category, {
      as: 'category',
      foreignKey: 'categoryid',
    });
    this.belongsTo(Store, {
      as: 'store',
      foreignKey: 'storeid',
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
    forDelivery: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    enabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  },
  {
    sequelize: db,
    modelName: 'Product',
    tableName: 'products'
  }
);

export default Product;
