import { DataTypes, Model } from 'sequelize';
import db from '../../db/dbConfig';
import User from '../user/userData/UserModel';

interface PlanAttributes {
  id: number;
  name?: string | null;
  price?: number | null;
  maxProd?: number | null;
  recomended: boolean;
}

class Plan extends Model<PlanAttributes> implements PlanAttributes {
  public id!: number;
  public name?: string | null;
  public price?: number | null;
  public maxProd?: number | null;
  public recomended!: boolean;
  

  // Método estático para inicializar el modelo
  static initModel(): void {
    this.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        price: {
          type: DataTypes.FLOAT,
          allowNull: true,
        },
        maxProd: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        recomended: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
        },
      },
      {
        sequelize: db,
        modelName: 'Plan', // Nombre del modelo en la base de datos
        timestamps: false,
        underscored: true,
      }
    );
  }


  public static associate(): void {
    this.hasMany(User,
      {
        as: 'user',
        foreignKey: 'planid'
      });
  }
}

// Inicializar el modelo
Plan.initModel();

export default Plan;
