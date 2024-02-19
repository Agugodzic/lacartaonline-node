import Store from './storeModel.js';
import PayMethod from '../payMethod/PayMethodModel.js';
import OpenHours from '../OpenHours/OpenHoursModel.js';

const store = Store;
const openHours = OpenHours;

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
  let route = generateRoute(resource.storename);
  route = await checkAndAdjustRoute(route);
  resource.route = route;
  resource.phone = resource.phone.replace(/\s/g, '');
  const createObject = await store.create(resource);

  openHours.create({storeid:createObject.id})

  return res.json(createObject.id);
};

const generateRoute = (storename) => {
  return storename.toLowerCase().replace(/\s+/g, '');
};

const checkAndAdjustRoute = async (route) => {
  let count = 1;
  let uniqueRoute = route;

  while (count) {
    const existingStore = await store.findOne({ where: { route: uniqueRoute } });
    if (!existingStore) {
      break;
    }
    count++;
    uniqueRoute = `${route}${count}`;
  }

  return uniqueRoute;
};

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
  return res.json(updateObject);
}

const deleteById = async (req, res) => {
  const { id } = req.body;
  const deleteObject = await store.destroy(id);
  return res.json(deleteObject);
}

export { getAll, getById, add, edit, deleteById, getMixById };