import User from './UserModel.js';

const user = User;

const getAll = async (req,res) => {
  const results = await user.findAll();
  return res.json(results);
}

const getById = async (req,res) => {
  const { id } = req.params;
  const resource = await user.findByPk(id);

  return res.json(resource);
}

const add = async (req, res) => {
  const resource = req.body;
  const createObject = await user.create(resource);

  return res.json(createObject);
}

const edit = async (req, res) => {
  const resource = req.body;
  const updateObject = await user.update(resource,{where:{id: resource.id}});

  return res.json(updateObject);
}

const deleteById = async (req, res) => {
  const { id } = req.body;
  const deleteObject = await user.destroy(id);

  return res.json(deleteObject);
}

export { getAll, getById, add, edit, deleteById };