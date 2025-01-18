import Store, { StoreAttributes } from './storeModel';
import PayMethod from '../payMethod/PayMethodModel';
import OpenHours, { OpenHoursAttributes } from '../OpenHours/OpenHoursModel';
import { Request, Response } from 'express';
import StoreModel from '../../interfaces/StoreModel';
import UserRequest from '../../interfaces/UserRequest';

const store = Store;
const openHours = OpenHours;


const getStore = async (req: Request, res: Response): Promise<void> => {
  const userid = req.userid;

  if (!userid) {
    res.status(400).json({ message: "User ID is required." });
    return;
  }

  // Buscar la tienda en la base de datos basada en el userid
  const resource = await Store.findOne({
    where: { userid },
  });

  if (!resource) {
    res.status(404).json({ message: "Store not found." });
    return;
  }

  res.json(resource);
};


const add = async (req: Request, res: Response): Promise<void> => {
  const resource = req.body;

  let route = generateRoute(resource.storename);
  route = await checkAndAdjustRoute(route);
  resource.route = route;
  resource.phone = resource.phone.replace(/\s/g, '');

  const createObject: StoreAttributes = await store.create(resource);

  const openHoursData: OpenHoursAttributes = {
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

const getMix = async (req: UserRequest, res: Response): Promise<void> => {

  const userid = req.userid;

  if (!userid) {
    res.status(400).json({ message: "User ID is required." });
    return;
  }

  // Buscar el recurso utilizando userid y cargar las relaciones
  const resource = await store.findOne({
    where: { userid }, // Usar userid como criterio de búsqueda
    include: [
      {
        model: PayMethod,
        as: "paymethods",
      },
      {
        model: OpenHours,
        as: "openhours",
      },
    ],
  });

  if (!resource) {
    res.status(404).json({ message: "Resource not found for the provided User ID." });
    return;
  }

  res.json(resource);
};

const edit = async (req: Request, res: Response): Promise<void> => {
  const resource = req.body;
  const updateObject = await store.update(resource, { where: { id: resource.id } });
  res.json(updateObject);
};

const deleteStore = async (req: Request, res: Response): Promise<void> => {
  const userid = req.userid;

  if (!userid) {
    res.status(400).json({ message: "User ID is required." });
    return;
  }

  // Buscar la tienda en la base de datos basada en el userid
  const resource = await Store.findOne({
    where: { userid },
  });

  if (!resource) {
    res.status(404).json({ message: "Store not found." });
    return;
  }

  const deleteObject = resource.destroy();

  res.status(204).json(deleteObject);
};

export { getStore, add, edit, deleteStore, getMix };
