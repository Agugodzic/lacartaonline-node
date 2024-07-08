import Variants from './VariantsModel.ts';
import { Request, Response } from 'express';

const variants = Variants;

const getAll = async (req: Request, res: Response): Promise<void> => {
  const results = await variants.findAll();
  res.json(results);
}

const getById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const resource = await variants.findByPk(id);
  res.json(resource);
}

const add = async (req: Request, res: Response): Promise<void> => {
  const resource = req.body;
  const createObject = await variants.create(resource);
  res.json(createObject);
}

const edit = async (req: Request, res: Response): Promise<void> => {
  const resource = req.body;
  await variants.update(resource, { where: { id: resource.id } });
  res.json({ message: 'Variant updated successfully' });
}

const deleteById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.body;
  await variants.destroy(id);
  res.json({ message: 'Variant deleted successfully' });
}

export { getAll, getById, add, edit, deleteById };
