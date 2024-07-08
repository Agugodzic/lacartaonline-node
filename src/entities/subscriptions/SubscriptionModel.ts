import db from "../../db/dbConfig"
import DataTypes from "sequelize";
// Define el modelo de suscripciones
const Subscription = db.define('Subscription', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  planId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: true 
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false
  },
});

export default Subscription;
