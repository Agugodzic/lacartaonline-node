import { DataTypes, Model, Optional } from "sequelize";
import db from "../../db/dbConfig";
import PayMethod from '../payMethod/PayMethodModel';
import Product from '../product/ProductModel';
import OpenHours from '../OpenHours/OpenHoursModel';
import User from "../user/userData/UserModel";

export interface StoreAttributes {
  id: number;
  userid: number;
  deliverymethod?: number;
  storename?: string | null;
  description?: string;
  logo?: string;
  banner?: string;
  email?: string;
  phone?: string;
  route?: string;
  owner?: string;
  address?: string;
  cp?: string;
  store_category?: string;
  locality?: string;
}

interface StoreCreationAttributes extends Optional<StoreAttributes, "id"> { }

class Store extends Model<StoreAttributes, StoreCreationAttributes> implements StoreAttributes {
  public id!: number;
  public userid!: number;
  public deliverymethod?: number;
  public storename?: string | null;
  public description?: string;
  public logo?: string;
  public banner?: string;
  public email?: string;
  public phone?: string;
  public route?: string;
  public owner?: string;
  public address?: string;
  public cp?: string;
  public store_category?: string;
  public locality?: string;


  static initModel(): void {
    this.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        userid: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        deliverymethod: {
          type: DataTypes.INTEGER
        },
        storename: {
          type: DataTypes.STRING,
          allowNull: true
        },
        description: {
          type: DataTypes.STRING,
        },
        logo: {
          type: DataTypes.TEXT('long')
        },
        banner: {
          type: DataTypes.TEXT('long')
        },
        email: {
          type: DataTypes.STRING,
        },
        phone: {
          type: DataTypes.STRING,
        },
        route: {
          type: DataTypes.STRING,
        },
        owner: {
          type: DataTypes.STRING,
        },
        address: {
          type: DataTypes.STRING,
        },
        cp: {
          type: DataTypes.STRING,
        },
        store_category: {
          type: DataTypes.STRING,
        },
        locality: {
          type: DataTypes.STRING,
        }
      },
      {
        sequelize: db,
        modelName: "Store",
        tableName: 'stores',
        timestamps: true,
      }
    );
  }

  static associate(): void {
    this.hasMany(PayMethod, {
      as: 'paymethods',
    });
    this.hasMany(Product, {
      as: 'storeProducts',
    });
    this.hasOne(OpenHours, {
      as: 'openhours',
      foreignKey: 'storeid',
    });
  }
}

Store.initModel();


export default Store;
