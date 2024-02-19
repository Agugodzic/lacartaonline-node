import db from "../../db/dbConfig.js"
import DataTypes from "sequelize";

  const Plan = db.define(
    "plans",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true,
      }, 
      price: {
        type: DataTypes.FLOAT,
        allowNull: true
      },
      maxProd: {
        type: DataTypes.INTEGER,
        allowNull: true,
      }, 
      recomender: {
        type: DataTypes.BOOLEAN
      }
    },{
      timestamps:false,
      underscored: true
    }
  );

  export default Plan;