import Product from './ProductModel';
import Category from '../category/CategoryModel';
import Variants from '../variants/VariantsModel';
import { Request, Response } from 'express';

const product = Product;

const getAll = async (req: Request, res: Response): Promise<void> => {
  const results = await product.findAll();
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
  const deleteObject = await product.destroy({
    where: { id: id }
  });
  res.json(deleteObject);
};

const getAllMixProducts = async (req: Request, res: Response): Promise<void> => {
  const { storeid } = req.params;
  const products = await Product.findAll({
    where: { storeid: storeid },
    include: [
      {
        model: Category
      },
      {
        model: Variants,
        as: 'variants'
      },
    ],
  });
  res.json(products);
};

export { getAll, getById, add, edit, deleteById, getAllMixProducts, getMixById };
