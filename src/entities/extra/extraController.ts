import Extra from './ExtraModel.js';

const extra = Extra;

const getAll = async (req,res) => {
  const results = await extra.findAll();
  return res.json(results);
}

const getById = async (req,res) => {
  const { id } = req.params;
  const resource = await extra.findByPk(id);

  return res.json(resource);
}

const add = async (req, res) => {
  const resource = req.body;
  const createObject = await extra.create(resource);

  return res.json(createObject);
}

const edit = async (req, res) => {
  const resource = req.body;
  const updateObject = await extra.update(resource,{where:{id: resource.id}});

  return res.json(updateObject);
}

const deleteById = async (req, res) => {
  const { id } = req.params;
  const deleteObject = await extra.destroy({
    where: { id: id }
  });

  return res.json(deleteObject);
}

export { getAll, getById, add, edit, deleteById };