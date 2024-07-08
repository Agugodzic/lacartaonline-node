import OpenHours from './OpenHoursModel';
import { Request, Response } from 'express';

const openHours = OpenHours;

const getAll = async (req: Request, res: Response): Promise<void> => {
  const results = await openHours.findAll();
  res.json(results);
};

const getById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const resource = await openHours.findByPk(id);
  res.json(resource);
};

const add = async (req: Request, res: Response): Promise<void> => {
  const resource = req.body;
  const createObject = await openHours.create(resource);
  res.json(createObject);
};

const edit = async (req: Request, res: Response): Promise<void> => {
  const resource = req.body;
  const updateObject = await openHours.update(resource, { where: { id: resource.id } });
  res.json(updateObject);
};

const deleteById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.body;
  const deleteObject = await openHours.destroy({ where: { id: id } });
  res.json(deleteObject);
};

export { getAll, getById, add, edit, deleteById };
