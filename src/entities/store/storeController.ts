import Store, { StoreAttributes} from './storeModel';
import PayMethod from '../payMethod/PayMethodModel';
import OpenHours, { OpenHoursAttributes } from '../OpenHours/OpenHoursModel';
import { Request, Response } from 'express';
import { Model } from 'sequelize';

const store = Store;
const openHours = OpenHours;

const getAll = async (req: Request, res: Response): Promise<void> => {
  const results = await store.findAll();
  res.json(results);
};

const getById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const resource = await store.findByPk(id);
  res.json(resource);
};

const add = async (req: Request, res: Response): Promise<void> => {
  const resource = req.body;
  let route = generateRoute(resource.storename);
  route = await checkAndAdjustRoute(route);
  resource.route = route;
  resource.phone = resource.phone.replace(/\s/g, '');
  const createObject:StoreAttributes = await store.create(resource);

  const openHoursData:OpenHoursAttributes = {
    storeid: createObject.id,
    monday: '[]',
    tuesday: '[]',
    wednesday: '[]',
    thursday: '[]',
    friday: '[]',
    saturday: '[]',
    sunday: '[]',
  };

  openHours.create(openHoursData);

  res.json(createObject.id);
};

const generateRoute = (storename: string): string => {
  return storename.toLowerCase().replace(/\s+/g, '');
};

const checkAndAdjustRoute = async (route: string): Promise<string> => {
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

const getMixById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const resource = await store.findByPk(id, {
    include: [
      {
        model: PayMethod,
        as: 'paymethods'
      },
      {
        model: OpenHours,
        as: 'openhours'
      }
    ]
  });

  res.json(resource);
};

const edit = async (req: Request, res: Response): Promise<void> => {
  const resource = req.body;
  const updateObject = await store.update(resource, { where: { id: resource.id } });
  res.json(updateObject);
};

const deleteById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.body;
  const deleteObject = await store.destroy(id);
  res.json(deleteObject);
};

export { getAll, getById, add, edit, deleteById, getMixById };
