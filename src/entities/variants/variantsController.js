import Variants from './VariantsModel.js';

const variants = Variants;

const getAll = async (req,res) => {
  const results = await variants.findAll();
  return res.json(results);
}

const getById = async (req,res) => {
  const { id } = req.params;
  const resource = await variants.findByPk(id);

  return res.json(resource);
}

const add = async (req, res) => {
  const resource = req.body;
  const createObject = await variants.create(resource);

  return res.json(createObject);
}

const edit = async (req, res) => {
  const resource = req.body;
  const updateObject = await variants.update(resource,{where:{id: resource.id}});

  return res.json(resource);
}

const deleteById = async (req, res) => {
  const { id } = req.body;
  const deleteObject = await variants.destroy(id);

  return res.json(deleteObject);
}

export { getAll, getById, add, edit, deleteById };