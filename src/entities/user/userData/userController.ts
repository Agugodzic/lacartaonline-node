import User from './UserModel.ts';
import { Request, Response } from 'express';

const user = User;

const getAll = async (req: Request, res: Response): Promise<void> => {
  const results = await user.findAll();
  res.json(results);
}

const getById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const resource = await user.findByPk(id);

  res.json(resource);
}

const add = async (req: Request, res: Response): Promise<void> => {
  const resource = req.body;
  const createObject = await user.create(resource);

  res.json(createObject);
}

const edit = async (req: Request, res: Response): Promise<void> => {
  const resource = req.body;
  const update = await user.update(resource, { where: { id: resource.id } });

  res.json({ update: update, resource: resource });
}

const deleteById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.body;
  const deleteObject = await user.destroy(id);

  res.json(deleteObject);
}

export { getAll, getById, add, edit, deleteById };
