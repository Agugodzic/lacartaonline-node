import DataTypes from "sequelize";
import db from "../../db/dbConfig.js"
import Extra from "../extra/ExtraModel.js";

const Category = db.define(
  "category",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    storeid: {
      type: DataTypes.INTEGER,
    },
    categoryname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    preview: { 
      type: DataTypes.TEXT('long') 
    },
    image: { 
      type: DataTypes.TEXT('long') 
    }
  },{
    timestamps:false,
    tableName:'category'
  }
);

Category.hasMany(Extra, {
  foreignKey: 'categoryid',
});

export default Category;
