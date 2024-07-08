import { DataTypes, Model } from 'sequelize';
import db from '../../db/dbConfig';

interface PayMethodAttributes {
  id: number;
  storeid: number;
  name: string;
  delivery: boolean;
  takeaway: boolean;
}

class PayMethod extends Model<PayMethodAttributes> implements PayMethodAttributes {
  public id!: number;
  public storeid!: number;
  public name!: string;
  public delivery!: boolean;
  public takeaway!: boolean;

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
          allowNull: false,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        delivery: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
        },
        takeaway: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
        },
      },
      {
        sequelize: db,
        modelName: 'PayMethod', // Nombre del modelo en la base de datos
        timestamps: false,
      }
    );
  }
}

// Inicializar el modelo
PayMethod.initModel();

export default PayMethod;
