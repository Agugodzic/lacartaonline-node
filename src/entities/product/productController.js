import Product from './ProductModel.js';
import Category from '../category/CategoryModel.js';
import Variants from '../variants/VariantsModel.js';

const product = Product;

const getAll = async (req,res) => {
  const results = await product.findAll();
  return res.json(results);
}

const getById = async (req,res) => {
  const { id } = req.params;
  const resource = await product.findByPk(id);

  return res.json(resource);
}

const getMixById = async (req,res) => {
  const { id } = req.params;
  const resource = await product.findByPk(id,
    {include: [
      {
        model: Category,
        attributes: ['id', 'categoryname']

      },
      {
        model: Variants,
        as: 'variants'
      },
    ]});

  return res.json(resource);
}

const add = async (req, res) => {
  const resource = req.body;
  const createObject = await product.create(resource);

  return res.json(createObject);
}

const edit = async (req, res) => {
  const resource = req.body;
  const updateObject = await product.update(resource,{where:{id: resource.id}});

  return res.json(updateObject);
}

const deleteById = async (req, res) => {
  const { id } = req.params;
  const deleteObject = await product.destroy({
    where: { id: id }
  })

  return res.json(deleteObject);
}

const getAllMixProducts = async (req, res) => {
  const product = await Product.findAll({
    include: [
      {
        model: Category
      },
      {
        model: Variants,
        as: 'variants'
      },
    ],
  });

  return res.json(product);
};

export { getAll, getById, add, edit, deleteById, getAllMixProducts, getMixById};