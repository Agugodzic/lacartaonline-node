import { DataTypes, Model } from 'sequelize';
import db from '../../db/dbConfig';

export interface OpenHoursAttributes {
  id?: number;
  storeid: number;
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;
}

class OpenHours extends Model<OpenHoursAttributes> implements OpenHoursAttributes {
  public id?: number;
  public storeid!: number;
  public monday!: string;
  public tuesday!: string;
  public wednesday!: string;
  public thursday!: string;
  public friday!: string;
  public saturday!: string;
  public sunday!: string;

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
        monday: {
          type: DataTypes.STRING,
          defaultValue: '[]',
        },
        tuesday: {
          type: DataTypes.STRING,
          defaultValue: '[]',
        },
        wednesday: {
          type: DataTypes.STRING,
          defaultValue: '[]',
        },
        thursday: {
          type: DataTypes.STRING,
          defaultValue: '[]',
        },
        friday: {
          type: DataTypes.STRING,
          defaultValue: '[]',
        },
        saturday: {
          type: DataTypes.STRING,
          defaultValue: '[]',
        },
        sunday: {
          type: DataTypes.STRING,
          defaultValue: '[]',
        },
      },
      {
        sequelize: db,
        modelName: 'OpenHours', // Nombre del modelo en la base de datos
        timestamps: false,
      }
    );
  }
}

// Inicializar el modelo
OpenHours.initModel();

export default OpenHours;
