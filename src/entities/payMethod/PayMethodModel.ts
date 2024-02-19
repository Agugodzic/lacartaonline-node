import db from "../../db/dbConfig.js"
import DataTypes from "sequelize";

  const PayMethod = db.define(
    "paymethod",
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
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      delivery: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      takeaway: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      }
    },{
      timestamps:false
    }
  );

  export default PayMethod;