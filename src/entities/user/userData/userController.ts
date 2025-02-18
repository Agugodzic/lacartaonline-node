import Plan from '../../plan/PlanModel.ts';
import User from './UserModel.ts';
import { Request, Response } from 'express';

const user = User;

const get = async (req: Request, res: Response): Promise<void> => {
  const id: number = req.userid;
  const resource = await user.findOne({
    where: { id },

    include: [{
      model: Plan,
      as: 'plan',
    }]
  });

  res.json(resource);
}

const add = async (req: Request, res: Response): Promise<void> => {
  const resource = req.body;
  const createObject = await user.create(resource);

  res.json(createObject);
}

const edit = async (req: Request, res: Response): Promise<void> => {
  const userid = req.userid;
  const resource = req.body;

  await user.update(resource, { where: { id: userid } });
  const updateObject = await user.findByPk(userid);

  res.json(updateObject);
}

const deleteById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.body;
  const deleteObject = await user.destroy(id);

  res.json(deleteObject);
}

export { get, add, edit, deleteById };
