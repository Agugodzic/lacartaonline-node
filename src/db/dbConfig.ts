import {Sequelize} from "sequelize";
import mysql2 from 'mysql2';
import dotenv from "dotenv";

dotenv.config();

const env = process.env;

const db = new Sequelize(env.DB_DATABASE || '', env.DB_USERNAME  || '', env.DB_PASSWORD || '', {
  host: env.DB_HOST,
  dialect: 'mysql',
  dialectModule: mysql2, // Quita esta línea
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

export default db;
