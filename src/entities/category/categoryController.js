import Category from './CategoryModel.js';
import Extra from '../extra/ExtraModel.js';
import Product from '../product/ProductModel.js';
import { Sequelize } from 'sequelize';

const category = Category;

const getAll = async (req,res) => {
  const results = await category.findAll();
  return res.json(results);
}

const getAllMix = async (req,res) => {
  const categories = await Category.findAll({
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


const getMixById = async (req,res) => {
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

const getById = async (req,res) => {
  const { id } = req.params;
  const resource = await category.findByPk(id);

  return res.json(resource);
}

const add = async (req, res) => {
  const resource = req.body;
  const createObject = await category.create(resource);

  return res.json(createObject);
}

const edit = async (req, res) => {
  const resource = req.body;
  const updateObject = await category.update(resource,{where:{id: resource.id}});

  return res.json(resource);
}

const deleteById = async (req, res) => {
  const { id } = req.params;
  const deleteObject = await category.destroy({
    where: { id: id }
  })

  return res.json(deleteObject);
}

export { getAll, getById, add, edit, deleteById, getAllMix, getMixById };