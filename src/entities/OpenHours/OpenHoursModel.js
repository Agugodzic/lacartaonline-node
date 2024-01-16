import db from "../../db/dbConfig.js"
import DataTypes from "sequelize";

  const OpenHours = db.define(
    "openhours",
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
      monday: {
        type: DataTypes.STRING,
        defaultValue:'[]'
      },
      tuesday: {
        type: DataTypes.STRING,
        defaultValue:'[]'
      },
      wednesday: {
        type: DataTypes.STRING,
        defaultValue:'[]'
      },
      thursday: {
        type: DataTypes.STRING,
        defaultValue:'[]'
      },
      friday: {
        type: DataTypes.STRING,
        defaultValue:'[]'
      },
      saturday: {
        type: DataTypes.STRING,
        defaultValue:'[]'
      },
      sunday: {
        type: DataTypes.STRING,
        defaultValue:'[]'
      }
    }
  );

  export default OpenHours;