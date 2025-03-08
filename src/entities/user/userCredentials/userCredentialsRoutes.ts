import { Router } from "express";
import {
  login,
  register,
  restorePassword,
  updatePassword,
} from "./userCredentialsController.ts";
import handleErrorsMiddleware from "../../../lib/middlewares/handleErrorsMiddleware.ts";
import authenticateToken from "../../../lib/middlewares/authenticateToken.ts";

const userRouter = Router();

userRouter.post("/login", handleErrorsMiddleware(login));

userRouter.post("/register", handleErrorsMiddleware(register));

userRouter.post("/restorePassword", handleErrorsMiddleware(restorePassword));

// with token
userRouter.put(
  "/updatePassword",
  authenticateToken,
  handleErrorsMiddleware(
    updatePassword,
    "Error al intentar actualizar la contraseña."
  )
);

export default userRouter;
