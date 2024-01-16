import db from "../../db/dbConfig.js"
import DataTypes from "sequelize";
import PayMethod from '../payMethod/PayMethodModel.js';
import Product from '../product/ProductModel.js';
import OpenHours from '../OpenHours/openHoursModel.js';

  const Store = db.define(
    "store",
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
      deliverymethod: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      storename: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description:DataTypes.TEXT,
      logo: {
        type: DataTypes.TEXT('long') 
      },
      banner: {
        type: DataTypes.TEXT('long') 
      },
      email: {
        type: DataTypes.STRING,
      },
      phone: {
        type: DataTypes.STRING,
      },
      route: {
        type: DataTypes.STRING,
      }
    },{
      timestamps:false
    }
  );

  Store.hasMany(PayMethod,{
    as:'paymethods',
  });
  Store.hasMany(Product,{
    as:'storeProducts',
  });
  Store.hasOne(OpenHours,{
    as:'openhours',
    foreignKey: 'storeid',
  });

  export default Store;