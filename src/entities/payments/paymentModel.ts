import { DataTypes, Model } from 'sequelize';
import db from '../../db/dbConfig';

interface PaymentDataAttributes {
  id: number;
  mpSubscriptionId: string;
  paymentDate: Date;
  paidAmount: number;
  paymentStatus: string;
  userId: number;
  paymentId: number;
  planId: number;
}

class PaymentData extends Model<PaymentDataAttributes> implements PaymentDataAttributes {
  public id!: number;
  public mpSubscriptionId!: string;
  public paymentDate!: Date;
  public paidAmount!: number;
  public paymentStatus!: string;
  public userId!: number;
  public paymentId!: number;
  public planId!: number;

  // Método estático para inicializar el modelo
  static initModel(): void {
    this.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        mpSubscriptionId: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        paymentDate: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        paidAmount: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
        },
        paymentStatus: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        userId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        paymentId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        planId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize: db,
        modelName: 'PaymentData', // Nombre del modelo en la base de datos
        timestamps: false,
      }
    );
  }
}

// Inicializar el modelo
PaymentData.initModel();

export default PaymentData;
