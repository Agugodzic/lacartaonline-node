import PayMethod from './PayMethodModel';
import { Request, Response } from 'express';

const payMethod = PayMethod;

const getAll = async (req: Request, res: Response): Promise<void> => {
  const results = await payMethod.findAll();
  res.json(results);
};

const getById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const resource = await payMethod.findByPk(id);
  res.json(resource);
};

const add = async (req: Request, res: Response): Promise<void> => {
  const resource = req.body;
  const createObject = await payMethod.create(resource);
  res.json(createObject);
};

const edit = async (req: Request, res: Response): Promise<void> => {
  const resource = req.body;
  const updateObject = await payMethod.update(resource, { where: { id: resource.id } });
  res.json(updateObject);
};

const deleteById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const deleteObject = await payMethod.destroy({ where: { id: id } });
  res.json(deleteObject);
};

export { getAll, getById, add, edit, deleteById };
