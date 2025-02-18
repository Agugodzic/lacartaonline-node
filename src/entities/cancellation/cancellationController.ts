import { Request, Response } from 'express';
import UserRequest from '../../interfaces/UserRequest';
import Cancellation from './cancellationModel';

const addCancellation = async (req: UserRequest, res: Response): Promise<void> => {
  try {
    const { reason } = req.body;
    const userid = req.userid;

    if (!userid) {
      res.status(400).json({ message: "Invalid token or User ID not provided." });
      return;
    }

    if (!reason) {
      res.status(400).json({ message: "Reason for cancellation is required." });
      return;
    }

    const newCancellation = await Cancellation.create({ userid, reason });

    res.status(201).json(newCancellation);
  } catch (error) {
    res.status(500).json({ message: "Error creating cancellation record.", error });
  }
};

export { addCancellation };
