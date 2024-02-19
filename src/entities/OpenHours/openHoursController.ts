import OpenHours from './OpenHoursModel.js';
import express, { Request, Response } from 'express';

const openHours = OpenHours;

const getAll = async (req:Request,res:Response) => {
  const results = await openHours.findAll();
  return res.json(results);
}

const getById = async (req:Request,res:Response) => {
  const { id } = req.params;
  const resource = await openHours.findByPk(id);

  return res.json(resource);
}

const add = async (req:Request,res:Response) => {
  const resource = req.body;
  const createObject = await openHours.create(resource);

  return res.json(createObject);
}

const edit = async (req:Request,res:Response) => {
  const resource = req.body;
  const updateObject = await openHours.update(resource,{where:{id: resource.id}});

  return res.json(updateObject);
}

const deleteById = async (req:Request,res:Response) => {
  const { id } = req.body;
  const deleteObject = await openHours.destroy(id);

  return res.json(deleteObject);
}

export { getAll, getById, add, edit, deleteById };