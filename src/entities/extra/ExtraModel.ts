import db from "../../db/dbConfig.js"
import DataTypes from "sequelize";

  const Extra = db.define(
    "extras",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      categoryid: {
        type: DataTypes.INTEGER,
      },
      extra: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      }
    },{
      timestamps:false
    }
  );

  db.sync();

  export default Extra;