import Extra from "../extra/ExtraModel";
import Product from "../product/ProductModel";
import Category from "./CategoryModel";
import express, { Request, Response } from 'express';

const category = Category;

const getAll = async (req:Request,res:Response) => {
  const { storeid } = req.params;

  const results = await category.findAll({where:{storeid:storeid}});
  return res.json(results);
}

const getAllMix = async (req:Request,res:Response) => {
  const { storeid } = req.params;

  const categories = await Category.findAll({
    where: { storeid: storeid },
    include: [
      { model:Extra,
        attributes: ['id','categoryid','extra','price']},
      {
        model: Product,
        attributes: ['id'],
        required: false
      }
    ]
  });

  return res.json(categories);
}


const getMixById = async (req:Request,res:Response) => {
  const { id } = req.params;
  const result = await Category.findByPk(id,{
    include: [
      { model:Extra,
        attributes: ['id','categoryid','extra','price']
      },
      {
        model: Product,
        attributes: ['id'],
        required: false
      }
    ]
  });

  return res.json(result);
}

const getById = async (req:Request,res:Response) => {
  const { id } = req.params;
  const resource = await category.findByPk(id);

  return res.json(resource);
}

const add = async (req:Request,res:Response) => {
  const resource = req.body;
  const createObject = await category.create(resource);

  return res.json(createObject);
}

const edit = async (req:Request,res:Response) => {
  const resource = req.body;
  const updateObject = await category.update(resource,{where:{id: resource.id}});

  return res.json(updateObject);
}

const deleteById = async (req:Request,res:Response) => {
  const { id } = req.params;
  const deleteObject = await category.destroy({
    where: { id: id }
  })

  return res.json(deleteObject);
}

export { getAll, getById, add, edit, deleteById, getAllMix, getMixById };