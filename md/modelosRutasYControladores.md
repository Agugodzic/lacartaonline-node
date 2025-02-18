# Guía de Arquitectura para Controladores, Rutas y Modelos

Esta guía explica cómo estructurar y organizar los archivos de **Controlador**, **Rutas** y **Modelo** en la aplicación. Cada modelo tiene su propia carpeta con estos tres archivos, y todas las carpetas de modelos se encuentran dentro de la carpeta `entities`.

## Estructura de Carpetas

La estructura de carpetas sigue este patrón:

```
src/
  entities/
    producto/
      productoController.ts
      productoModel.ts
      productoRoutes.ts
    sugerencia/
      sugerenciaController.ts
      sugerenciaModel.ts
      sugerenciaRoutes.ts
  lib/
    middlewares/
      handleErrorsMiddleware.ts
      authenticateToken.ts
  config/
    dbConfig.ts
  app.ts
```

- **`entities/`**: Contiene subcarpetas para cada modelo (e.g., `producto`, `sugerencia`), con los archivos correspondientes para controladores, modelos y rutas.
- **`lib/`**: Archivos utilitarios, como middleware para manejar errores y autenticación.
- **`config/`**: Configuración de la base de datos y otros archivos de configuración.
- **`app.ts`**: Punto de entrada para la aplicación.

## Descripción de los Archivos

### 1. **Controlador (`<modelo>Controller.ts`)**

El controlador maneja la lógica de negocio y las interacciones con la base de datos a través del modelo. Realiza operaciones como crear, editar, eliminar y obtener registros.

#### Ejemplo: `productoController.ts`

```typescript
import { Request, Response } from "express";
import Producto from "../../models/producto/productoModel";

const agregar = async (req: Request, res: Response): Promise<void> => {
  try {
    const producto = await Producto.create(req.body);
    res.status(201).json(producto);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al crear producto", error });
  }
};

const eliminarPorId = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const producto = await Producto.findByPk(id);
  if (!producto) {
    res.status(404).json({ mensaje: "Producto no encontrado" });
    return;
  }
  await producto.destroy();
  res.status(204).send();
};
```

- Cada función del controlador corresponde a una acción (crear, editar, eliminar, obtener).
- Se interactúa con el **modelo** para realizar las operaciones en la base de datos.

### 2. **Modelo (`<modelo>Model.ts`)**

El modelo define la estructura de la base de datos y las relaciones entre tablas. Usa un ORM como Sequelize para gestionar la base de datos.

#### Ejemplo: `productoModel.ts`

```typescript
import { DataTypes, Model } from "sequelize";
import db from "../../config/dbConfig";

interface ProductoAttributes {
  id: number;
  nombre: string;
  precio: number;
  categoria: string;
}

class Producto extends Model<ProductoAttributes> implements ProductoAttributes {
  public id!: number;
  public nombre!: string;
  public precio!: number;
  public categoria!: string;
}

Producto.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    precio: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    categoria: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize: db,
    modelName: "Producto",
    tableName: "productos",
  }
);

export default Producto;
```

- Define la **estructura de la tabla** y las **relaciones** entre modelos.
- Se usa `sequelize` para inicializar y definir los atributos de la tabla.

### 3. **Rutas (`<modelo>Routes.ts`)**

El archivo de rutas mapea los **endpoints HTTP** a los métodos del controlador. Aquí se definen las rutas que la API va a exponer.

#### Ejemplo: `productoRoutes.ts`

```typescript
import { Router } from "express";
import { agregar, eliminarPorId } from "./productoController";
import authenticateToken from "../../lib/middlewares/authenticateToken";
import handleErrorsMiddleware from "../../lib/middlewares/handleErrorsMiddleware";

const productoRouter = Router();

productoRouter.post(
  "/producto/add",
  authenticateToken,
  handleErrorsMiddleware(agregar)
);
productoRouter.delete(
  "/producto/:id",
  authenticateToken,
  handleErrorsMiddleware(eliminarPorId)
);

export default productoRouter;
```

- **Definición de Rutas**: Cada ruta se mapea a una acción (por ejemplo, `POST /producto/add` llama al método `agregar`).
- **Middleware**: Se utilizan middlewares como la autenticación (`authenticateToken`) y manejo de errores (`handleErrorsMiddleware`).

## Directrices para Agregar Nuevos Modelos

1. **Crear una Nueva Carpeta**:

   - Dentro de `entities`, crea una carpeta para el nuevo modelo (e.g., `entities/producto`).

2. **Agregar el Archivo del Modelo**:

   - Define el esquema de la base de datos en el archivo `modeloModel.ts`.

3. **Agregar el Controlador**:

   - Crea el archivo del controlador (`modeloController.ts`) con las funciones necesarias.

4. **Crear el Archivo de Rutas**:

   - Define las rutas en el archivo `modeloRoutes.ts`.

5. **Registrar las Rutas en el Router Principal**:
   - Asegúrate de importar y usar las rutas en el archivo principal de rutas (`app.ts` o `routes.ts`).

## Buenas Prácticas

- **Separación de Responsabilidades**: Mantén la lógica de negocio en el **controlador**, la definición de la base de datos en el **modelo** y el enrutamiento en el archivo de **rutas**.
- **Validación y Manejo de Errores**: Realiza validaciones en el controlador antes de interactuar con la base de datos, y siempre devuelve respuestas apropiadas con códigos de estado HTTP.
- **Modularidad**: Mantén el código modular y reutilizable, especialmente para middlewares y funciones comunes.

---
