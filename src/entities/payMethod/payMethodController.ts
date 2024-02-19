import PayMethod from './PayMethodModel.js';
import express, { Request, Response } from 'express';

const payMethod = PayMethod;

const getAll = async (req:Request,res:Response) => {
  const results = await payMethod.findAll();
  return res.json(results);
}

const getById = async (req:Request,res:Response) => {
  const { id } = req.params;
  const resource = await payMethod.findByPk(id);

  return res.json(resource);
}

const add = async (req:Request,res:Response) => {
  const resource = req.body;
  const createObject = await payMethod.create(resource);

  return res.json(createObject);
}

const edit = async (req:Request,res:Response) => {
  const resource = req.body;
  const updateObject = await PayMethod.update(resource,{where:{id: resource.id}});

  return res.json(updateObject);
}

const deleteById = async (req:Request,res:Response) => {
  const { id } =  req.params;
  const deleteObject =  await PayMethod.destroy({
    where: { id: id }
  });

  return res.json(deleteObject);
}

export { getAll, getById, add, edit, deleteById };