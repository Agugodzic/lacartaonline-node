import db from "../../db/dbConfig.js"
import DataTypes from "sequelize";

  const Variants = db.define(
    "variants",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      productid: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      variant1: {
        type: DataTypes.STRING
      },
      price1: {
        type: DataTypes.FLOAT
      },
      variant2: {
        type: DataTypes.STRING
      },
      price2: {
        type: DataTypes.FLOAT
      },
      variant3: {
        type: DataTypes.STRING
      },
      price3: {
        type: DataTypes.FLOAT
      }
    },{
        timestamps:false
      }
  );

  export default Variants;