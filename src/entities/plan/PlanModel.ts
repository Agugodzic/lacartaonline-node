import { DataTypes, Model } from 'sequelize';
import db from '../../db/dbConfig';

interface PlanAttributes {
  id: number;
  name?: string | null;
  price?: number | null;
  maxProd?: number | null;
  recomender: boolean;
}

class Plan extends Model<PlanAttributes> implements PlanAttributes {
  public id!: number;
  public name?: string | null;
  public price?: number | null;
  public maxProd?: number | null;
  public recomender!: boolean;

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
        recomender: {
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
}

// Inicializar el modelo
Plan.initModel();

export default Plan;
