import { DataTypes, Model } from 'sequelize';
import db from '../../db/dbConfig';

interface ExtraAttributes {
  id: number;
  categoryid: number;
  extra: string;
  price: number;
}

class Extra extends Model<ExtraAttributes> implements ExtraAttributes {
  public id!: number;
  public categoryid!: number;
  public extra!: string;
  public price!: number;

  // Método estático para inicializar el modelo
  static initModel(): void {
    this.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        categoryid: {
          type: DataTypes.INTEGER,
        },
        extra: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        price: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
      },
      {
        sequelize: db,
        modelName: 'Extra', // Nombre del modelo en la base de datos
        timestamps: false,
        tableName: 'extras',
      }
    );
  }
}

// Inicializar el modelo
Extra.initModel();

export default Extra;
