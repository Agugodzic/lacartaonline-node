import { Request, Response } from 'express';
import UserRequest from '../../interfaces/UserRequest';
import Suggestion from './SuggestionModel';

const add = async (req: UserRequest, res: Response): Promise<void> => {
  try {
    const { title, message } = req.body;
    const userid = req.userid;

    if (!userid) {
      res.status(400).json({ message: "Token no valido." });
      return;
    }

    if (!title || !message) {
      res.status(400).json({ message: "Los campos son requeridos." });
      return;
    }

    const newSuggestion = await Suggestion.create({ userid, title, message });

    res.status(201).json(newSuggestion);
  } catch (error) {
    res.status(500).json({ message: "Error al enviar sugerencia.", error });
  }
};

const deleteSuggestion = async (req: UserRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const userid = req.userid;

    if (!userid) {
      res.status(400).json({ message: "User ID is required." });
      return;
    }

    const suggestion = await Suggestion.findOne({
      where: { id, userid },
    });

    if (!suggestion) {
      res.status(404).json({ message: "Suggestion not found or not authorized." });
      return;
    }

    await suggestion.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Error deleting suggestion", error });
  }
};

export { add, deleteSuggestion };
