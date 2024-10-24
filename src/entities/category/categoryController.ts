import Extra from "../extra/ExtraModel";
import Product from "../product/ProductModel";
import Category from "./CategoryModel";
import { Request, Response } from 'express';

const category = Category;

const getAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const { storeid } = req.params;
    const results = await category.findAll({ where: { storeid: storeid } });
    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const getAllMix = async (req: Request, res: Response): Promise<void> => {
  try {
    const { storeid } = req.params;
    const categories = await Category.findAll({
      where: { storeid: storeid },
      include: [
        { model: Extra, as:'extras', attributes: ['id', 'categoryid', 'extra', 'price'] },
        { model: Product, as:'products',attributes: ['id'], required: false }
      ]
    });
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const getMixById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const result = await Category.findByPk(id, {
      include: [
        { model: Extra, as:'extras', attributes: ['id', 'categoryid', 'extra', 'price'] },
        { model: Product, as:'products', attributes: ['id'], required: false }
      ]
    });
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const getById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const resource = await category.findByPk(id);
    res.json(resource);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const add = async (req: Request, res: Response): Promise<void> => {
  try {
    const resource = req.body;
    const createObject = await category.create(resource);
    res.json(createObject);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const edit = async (req: Request, res: Response): Promise<void> => {
  try {
    const resource = req.body;
    const updateObject = await category.update(resource, { where: { id: resource.id } });
    res.json(updateObject);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const deleteById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const deleteObject = await category.destroy({ where: { id: id } });
    res.json(deleteObject);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export { getAll, getById, add, edit, deleteById, getAllMix, getMixById };
