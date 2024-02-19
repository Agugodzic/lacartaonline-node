import express from "express";
import morgan from "morgan";
import db from "./db/dbConfig.js";
import dotenv from "dotenv";
import variantsRouter from "./entities/variants/variantsRoutes.js";
import categoryRouter from "./entities/category/categoryRoutes.js";
import extraRouter from "./entities/extra/extraRoutes.js";
import payMethodRouter from "./entities/payMethod/payMethodRoutes.js";
import productRouter from "./entities/product/productRoutes.js";
import paymentRouter from "./entities/payments/paymentRoutes.js";
import openHoursRouter from "./entities/OpenHours/openHoursRoutes.js";
import storeRouter from "./entities/store/storeRoutes.js";
import compression from "compression";
import corsMiddleware from './lib/security/corsConfig.js';
import userCredentialsRouter from "./entities/user/userCredentials/userCredentialsRoutes.js";
import userRoutes from "./entities/user/userData/userRoutes.js";

dotenv.config();

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 4000;
const app/*:express.Application*/ = express();
const DB = db;


app.use(morgan('dev'));
app.use(corsMiddleware);
app.get("/", (req, res) => {res.send("La carta online - Api");});
app.use(compression());
app.use(express.json({ limit: '10mb' }));

app.use( // ROUTERS
  productRouter,
  variantsRouter,
  categoryRouter,
  payMethodRouter,
  extraRouter,
  storeRouter,
  openHoursRouter,
  userCredentialsRouter,
  userRoutes,
  paymentRouter
  );

  app.listen(PORT, () => console.log("Server connection: port " + PORT));

(async ()=> {
  try{
    await DB.authenticate()
    await DB.sync()
    console.log('DB auth: OK.')}

  catch(error){
    console.log("db conection failed")
    throw("DB conection failed:" + error)
  }
})();
