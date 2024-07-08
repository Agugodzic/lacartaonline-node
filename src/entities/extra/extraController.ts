import Extra from './ExtraModel';
import { Request, Response } from 'express';

const extra = Extra;

const getAll = async (req:Request,res:Response):Promise<void> => {
  const results = await extra.findAll();
  res.json(results);
}

const getById = async (req:Request,res:Response):Promise<void> => {
  const { id } = req.params;
  const resource = await extra.findByPk(id);
  
  res.json(resource);
}

const add = async (req:Request,res:Response):Promise<void> => {
  const resource = req.body;
  const createObject = await extra.create(resource);

  res.json(createObject);
}

const edit = async (req:Request,res:Response):Promise<void> => {
  const resource = req.body;
  const updateObject = await extra.update(resource,{where:{id: resource.id}});

  res.json(updateObject);
}

const deleteById = async (req:Request,res:Response):Promise<void> => {
  const { id } = req.params;
  const deleteObject = await extra.destroy({
    where: { id: id }
  });

  res.json(deleteObject);
}

export { getAll, getById, add, edit, deleteById };