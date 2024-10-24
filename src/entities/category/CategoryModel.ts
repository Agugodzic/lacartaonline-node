import { DataTypes, Model } from 'sequelize';
import db from '../../db/dbConfig';
import Extra from '../extra/ExtraModel';
import Product from '../product/ProductModel';

interface CategoryAttributes {
  id: number;
  storeid: number;
  categoryname: string;
  description?: string;
  preview?: string;
  image?: string;
}

class Category extends Model<CategoryAttributes> implements CategoryAttributes {
  public id!: number;
  public storeid!: number;
  public categoryname!: string;
  public description?: string;
  public preview?: string;
  public image?: string;

  // Método estático para inicializar el modelo
  static initModel(): void {
    this.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        storeid: {
          type: DataTypes.INTEGER,
        },
        categoryname: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        description: {
          type: DataTypes.STRING,
        },
        preview: {
          type: DataTypes.TEXT('long'),
        },
        image: {
          type: DataTypes.TEXT('long'),
        },
      },
      {
        sequelize: db,
        modelName: 'Category', // Nombre del modelo en la base de datos
        timestamps: false,
        tableName: 'category',
      }
    );
  }
  // Definir las relaciones con otros modelos
  static associate(): void {
    this.hasMany(Product, {
      as: 'products', // Alias para la asociación, puede ser opcional
      foreignKey: 'categoryid',
    });
    
    this.hasMany(Extra, {
      as:'extras',
      foreignKey: 'categoryid',
    });
  }
}

// Inicializar el modelo
Category.initModel();


export default Category;
