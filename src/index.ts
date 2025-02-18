import express from "express";
import morgan from "morgan";
import db from "./db/dbConfig";
import dotenv from "dotenv";
import variantsRouter from "./entities/variants/variantsRoutes";
import categoryRouter from "./entities/category/categoryRoutes";
import extraRouter from "./entities/extra/extraRoutes";
import payMethodRouter from "./entities/payMethod/payMethodRoutes";
import productRouter from "./entities/product/productRoutes";
import paymentRouter from "./entities/payments/paymentRoutes";
import openHoursRouter from "./entities/OpenHours/openHoursRoutes";
import storeRouter from "./entities/store/storeRoutes";
import compression from "compression";
import corsMiddleware from './lib/security/corsConfig';
import userCredentialsRouter from "./entities/user/userCredentials/userCredentialsRoutes";
import userRoutes from "./entities/user/userData/userRoutes";
import Category from "./entities/category/CategoryModel";
import Product from "./entities/product/ProductModel";
import Extra from "./entities/extra/ExtraModel";
import Store from "./entities/store/storeModel";
import PayMethod from "./entities/payMethod/PayMethodModel";
import Plan from "./entities/plan/PlanModel";
import User from "./entities/user/userData/UserModel";
import Suggestion from "./entities/suggestion/SuggestionModel";
import suggestionsRouter from "./entities/suggestion/SuggestionRoutes";
import userMessageRouter from "./entities/userMessages/UserMessageRoutes";
import Cancellation from "./entities/cancellation/cancellationModel";
import cancellationsRouter from "./entities/cancellation/cancellationRoutes";

dotenv.config();
// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 4000;
const app: express.Application = express();
const DB = db;

Product.associate();
Extra.associate();
Category.associate();
PayMethod.associate();
Store.associate();
Plan.associate();
User.associate();
Suggestion.associate();
Cancellation.associate();


app.use(morgan('dev'));
app.use(corsMiddleware);
app.get("/", (req, res) => { res.send("La carta online - Api"); });
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
  paymentRouter,
  suggestionsRouter,
  userMessageRouter,
  cancellationsRouter
);

app.listen(PORT, () => console.log("Server connection: port " + PORT));

(async () => {
  try {
    await DB.authenticate()
    await DB.sync()
    console.log('DB auth: OK.')
  }

  catch (error) {
    console.log("db conection failed")
    throw ("DB conection failed:" + error)
  }
})();
