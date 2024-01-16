import DataTypes from "sequelize";
import db from "../../db/dbConfig.js";
import Variants from "../variants/VariantsModel.js";
import Category from "../category/CategoryModel.js";

  const Product = db.define(
    "product",
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
      },
      productname: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.STRING,
      },
      image: { 
        type: DataTypes.TEXT('long') 
      }
    }
  );

  Product.hasOne(Variants, {
    as: 'variants',
    foreignKey: 'productid',
  });

  Category.hasMany(Product, {
    foreignKey: 'categoryid',
  });
  
  Product.belongsTo(Category, {
    foreignKey: 'categoryid',
  });

  export default Product;