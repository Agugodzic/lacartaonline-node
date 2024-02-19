import Sequelize from "sequelize";
import mysql2 from 'mysql2';
import dotenv from "dotenv";

dotenv.config();

const env = process.env; // eslint-disable-line


const db = new Sequelize(env.DB_DATABASE, env.DB_USERNAME , env.DB_PASSWORD, {
  host: env.DB_HOST,
  password: env.DB_PASSWORD,
  dialect: 'mysql',
  dialectModule: mysql2,

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

export default db;