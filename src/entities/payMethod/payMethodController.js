import PayMethod from './PayMethodModel.js';

const payMethod = PayMethod;

const getAll = async (req,res) => {
  const results = await payMethod.findAll();
  return res.json(results);
}


const getById = async (req,res) => {
  const { id } = req.params;
  const resource = await payMethod.findByPk(id);

  return res.json(resource);
}


const add = async (req, res) => {
  const resource = req.body;
  const createObject = await payMethod.create(resource);

  return res.json(createObject);
}


const edit = async (req, res) => {
  const resource = req.body;
  const updateObject = await PayMethod.update(resource,{where:{id: resource.id}});

  return res.json(resource);
}


const deleteById = async (req, res) => {
  const { id } =  req.params;
  const deleteObject =  await PayMethod.destroy({
    where: { id: id }
  });

  return res.json(deleteObject);
}


export { getAll, getById, add, edit, deleteById };