
import { Request, Response } from 'express';
import UserRequest from '../../interfaces/UserRequest';
import UserMessage from './UserMessageModel';


const add = async (req: UserRequest, res: Response): Promise<void> => {
  try {
    const { title, message } = req.body;
    const userid = req.userid;

    if (!userid) {
      res.status(400).json({ message: "User ID is required." });
      return;
    }

    if (!title || !message) {
      res.status(400).json({ message: "Title and message are required." });
      return;
    }

    const newUserMessage = await UserMessage.create({ userid, title, message });

    res.status(201).json(newUserMessage);
  } catch (error) {
    res.status(500).json({ message: "Error creating UserMessage", error });
  }
};

const deleteUserMessage = async (req: UserRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const userid = req.userid;

    if (!userid) {
      res.status(400).json({ message: "User ID is required." });
      return;
    }

    const userMessage = await UserMessage.findOne({
      where: { id, userid },
    });

    if (!userMessage) {
      res.status(404).json({ message: "UserMessage not found or not authorized." });
      return;
    }

    await userMessage.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Error deleting UserMessage", error });
  }
};

export { add, deleteUserMessage };
