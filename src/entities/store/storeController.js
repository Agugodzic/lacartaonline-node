import Store from './storeModel.js';
import PayMethod from '../payMethod/PayMethodModel.js';
import OpenHours from '../OpenHours/openHoursModel.js';

const store = Store;

const getAll = async (req,res) => {
  const results = await store.findAll();
  return res.json(results);
}

const getById = async (req,res) => {
  const { id } = req.params;
  const resource = await store.findByPk(id);
  return res.json(resource);
}

const add = async (req, res) => {
  const resource = req.body;
  const createObject = await store.create(resource);
  return res.json(createObject);
}

const getMixById = async (req,res) => {
  const { id } = req.params;
  const resource = await store.findByPk(id,
    {include: [
      {
        model: PayMethod,
        as:'paymethods'
      },
      {
        model: OpenHours,
        as:'openhours'
      }
    ]});

  return res.json(resource);
}

const edit = async (req, res) => {
  const resource = req.body;
  const updateObject = await store.update(resource,{where:{id: resource.id}});
  return res.json(resource);
}

const deleteById = async (req, res) => {
  const { id } = req.body;
  const deleteObject = await store.destroy(id);
  return res.json(deleteObject);
}

export { getAll, getById, add, edit, deleteById, getMixById };