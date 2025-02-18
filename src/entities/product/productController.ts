import Product from './ProductModel';
import Category from '../category/CategoryModel';
import Variants from '../variants/VariantsModel';
import { Request, Response } from 'express';
import Extra from '../extra/ExtraModel';
import Store from '../store/storeModel';
 

const product = Product;


const getAll = async (req: Request, res: Response): Promise<void> => {
  const results = await product.findAll({
    attributes: { exclude: ['image'] },
  });
  res.json(results);
};


const getById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const resource = await product.findByPk(id);
  res.json(resource);
};


const getMixById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const resource = await product.findByPk(id, {
    include: [
      {
        model: Category,
        as: 'category',
        attributes: ['id', 'categoryname']
      },
      {
        model: Variants,
        as: 'variants'
      },
    ]
  });
  res.json(resource);
};


const add = async (req: Request, res: Response): Promise<void> => {
  const resource = req.body;
  const createObject = await product.create(resource);
  
  res.json(createObject);
};


const edit = async (req: Request, res: Response): Promise<void> => {
  const resource = req.body;
  const updateObject = await product.update(resource, { where: { id: resource.id } });

  res.json(updateObject);
};


const deleteById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { userid } = req; // Obtenido del token
  const productToDelete = await Product.findOne({ where: { id } });

  if (!productToDelete) {
    res.status(404).json({ error: "Producto no encontrado" });
    return;
  }

  // Verificar que el storeId del producto pertenece al usuario
  const store = await Store.findOne({
    where: { id: productToDelete.storeid, userid }
  });

  if (!store) {
    res.status(403).json({ error: "No tienes permiso para eliminar este producto" });
    return;
  }

  await Product.destroy({ where: { id } });

  res.json({ success: true });
};



const deleteMany = async (req: Request, res: Response): Promise<void> => {
  const userId = req.userid; 
  const products = req.body;

  const stores = await Store.findAll({
    attributes: ["id"],
    where: { userid: userId },
    raw: true
  });

  const storeIds = stores.map(store => store.id);
  if (storeIds.length === 0) {
    res.status(403).json({ error: "No tienes tiendas asociadas" });
    return;
  }

  const productIds = products.map((p:{id:number,storeid:number}) => p.id);
  const validProducts = await Product.findAll({
    attributes: ["id"],
    where: { id: productIds, storeid: storeIds },
    raw: true,
  });

  const validProductIds = validProducts.map(p => p.id);
  if (validProductIds.length === 0) {
    res.status(404).json({ error: "No hay productos válidos para eliminar" });
    return;
  }

  await Product.destroy({
    where: { id: validProductIds },
  });

  res.status(200).json({ deleted: validProductIds });
};

const disableMany = async (req: Request, res: Response): Promise<void> => {
  const userId = req.userid; 
  const products = req.body;

  const storeIds = (await Store.findAll({
    attributes: ["id"],
    where: { userid: userId },
    raw: true
  })).map(store => store.id);

  if (storeIds.length === 0) {
    res.status(403).json({ error: "El producto no corresponde a tu usuario." });
    return;
  }

  const productIds = products.map((p: { id: number }) => p.id);

  await Product.update(
    { enabled: false },
    { where: { id: productIds, storeid: storeIds } } // Actualiza todos los productos en un solo paso
  );

  res.status(200).json({ success: true, message: "Productos deshabilitados" });
};

const enableMany = async (req: Request, res: Response): Promise<void> => {
  const userId = req.userid; 
  const products = req.body;

  const storeIds = (await Store.findAll({
    attributes: ["id"],
    where: { userid: userId },
    raw: true
  })).map(store => store.id);

  if (storeIds.length === 0) {
    res.status(403).json({ error: "El producto no corresponde a tu usuario." });
    return;
  }

  const productIds = products.map((p: { id: number }) => p.id);

  await Product.update(
    { enabled: true },
    { where: { id: productIds, storeid: storeIds } } // Mismo procedimiento para activar productos
  );

  res.status(200).json({ success: true, message: "Productos habilitados" });
};



const getAllMixProducts = async (req: Request, res: Response): Promise<void> => {
  const { storeid } = req.params;
  const products = await Product.findAll({
    where: { storeid: storeid },
    attributes: { exclude: ['image'] },
    include: [
      {
        model: Category,
        as: 'category',

        include: [{
          model: Extra,
          as: 'extras'
        }],

        attributes: { exclude: ['image'] },
      },
      {
        model: Variants,
        as: 'variants',
      },
    ],
  });

  res.json(products);
};


export { getAll, getById, add, edit, deleteById, getAllMixProducts, getMixById, deleteMany, enableMany, disableMany };
