import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import UserCredentials from "./UserCredentialsModel";
import User from "../userData/UserModel";
import nodemailer from "nodemailer";
import crypto from "crypto";
import dotenv from "dotenv";

const userCredentials = UserCredentials;
const userModel = User;
dotenv.config();

const logout = (req: Request, res: Response): Response => {
  return res.json({ message: "Logout exitoso" });
};

const deleteUser = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  await userCredentials.destroy({
    where: { id },
  });

  res.json({ message: "Usuario eliminado" });
};

//errors:
// 1 - user already exist
// 2 - email already exist
// 3 - password or user incorrect

const register = async (req: Request, res: Response): Promise<void> => {
  const { user, password, name, province, address, email, phone, country } =
    req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await UserCredentials.findOne({ where: { user } });
  const existingEmail = await User.findOne({ where: { email } });

  if (existingUser) {
    res.json({
      success: false,
      error: "Error: User already exist.",
      errorId: 1,
    });
    return;
  }

  if (existingEmail) {
    res.json({
      success: false,
      error: "Error: Email already exist.",
      errorId: 2,
    });
    return;
  }

  const newUser = await userModel.create({
    name: name,
    province: province,
    email: email,
    phone: phone,
    country: country,
    activeSubscription: false,
  });

  await userCredentials.create({
    userId: newUser.id,
    user: user,
    password: hashedPassword,
  });

  // Excluye el id del usuario y lo guarda en un una nueva constante "userData"
  const { id, ...userData } = newUser.toJSON();

  const secretKey = process.env.SECRET_KEY || ""; //eslint-disable-line
  const token = jwt.sign({ userId: newUser.id }, secretKey, {
    expiresIn: "24h",
  });

  res.json({
    success: true,
    error: "No errors",
    errorId: 0,
    token: token,
    userData: {
      ...userData,
    },
  });
};

const login = async (req: Request, res: Response): Promise<void> => {
  const { user, password, keepConnected } = req.body;

  const userCredential = await userCredentials.findOne({
    where: { user },
  });

  if (userCredential) {
    const isPasswordValid = await bcrypt.compare(
      password,
      userCredential.password
    );

    if (isPasswordValid) {
      const secretKey = process.env.SECRET_KEY || ""; //eslint-disable-line

      const userData = await userModel.findOne({
        where: { id: userCredential.userId || 0 },
        attributes: { exclude: ["id"] },
      });

      const userId = userCredential.userId || 0;
      if (keepConnected === true) {
        const token = jwt.sign({ userId: userId }, secretKey);
        res.json({
          success: true,
          message: "Login success",
          token: token,
          userData: userData,
        });
        return;
      } else {
        const token = jwt.sign({ userId: userId }, secretKey, {
          expiresIn: "24h",
        });
        res.json({
          success: true,
          message: "Login success",
          token: token,
          userData: userData,
        });
        return;
      }
    }
  }

  res.json({
    success: false,
    message: "Usuario o contraseña incorrectos",
    token: false,
    errorId: 3,
  });
};

const updatePassword = async (req: Request, res: Response): Promise<void> => {
  const userid = req.userid;
  const { password, newPassword, confirmPassword } = req.body;

  if (!password || !newPassword || !confirmPassword) {
    res.json({
      success: false,
      message: "Todos los campos son obligatorios.",
      errorId: 4,
    });
    return;
  }

  // Verificar que las nuevas contraseñas coincidan
  if (newPassword !== confirmPassword) {
    res.json({
      success: false,
      message: "Las contraseñas no coinciden.",
      errorId: 5,
    });
    return;
  }

  // Buscar al usuario en la base de datos
  const userCredential = await UserCredentials.findOne({
    where: { userId: userid },
  });

  if (!userCredential) {
    res.json({ success: false, message: "Usuario no encontrado.", errorId: 6 });
    return;
  }

  // Verificar que la contraseña actual sea válida
  const isPasswordValid = await bcrypt.compare(
    password,
    userCredential.password
  );
  if (!isPasswordValid) {
    res.json({
      success: false,
      message: "Contraseña actual incorrecta.",
      errorId: 7,
    });
    return;
  }

  // Encriptar la nueva contraseña
  const hashedNewPassword = await bcrypt.hash(newPassword, 10);

  // Actualizar la contraseña en la base de datos
  await userCredential.update({ password: hashedNewPassword });

  res.json({ success: true, message: "Contraseña actualizada con éxito." });
};

const restorePassword = async (req: Request, res: Response): Promise<void> => {
  const { email } = req.body;

  const user: User | null = await User.findOne({
    where: { email: email },
  });

  if (!user) {
    res.status(404).json({ message: "Usuario no encontrado" });
    return;
  }

  const token = crypto.getRandomValues(new Uint32Array(1)).toString();

  const credentials: UserCredentials | null = await UserCredentials.findOne({
    where: { userId: user.id },
  });

  if (credentials) {
    credentials.reset_password_token = token;
    credentials.reset_password_expires = new Date(Date.now() + 3600000); // una hora de validez
    await credentials.save();
  } else {
    res.status(500).json({ message: "Error en el servidor" });
    return;
  }

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST, // Ejemplo: smtp.hostinger.com
    port: Number(process.env.EMAIL_PORT), // Asegúrate de convertir el puerto a número
    secure: process.env.EMAIL_PORT === "465", // Usa 'true' para SSL (puerto 465) o 'false' para TLS (puerto 587)
    auth: {
      user: process.env.EMAIL_USER, // Tu correo de Hostinger
      pass: process.env.EMAIL_PASS, // Tu contraseña de Hostinger
    },
  });

  const resetLink = `http://localhost:3000/restaurar/${token}`;

  const mailOptions = {
    to: user.email,
    from: process.env.EMAIL_USER,
    subject: "Restablecimiento de contraseña",
    text: `Haga clic en el siguiente enlace para restablecer su contraseña: ${resetLink}`,
  };

  await transporter.sendMail(mailOptions);
  res.status(200).json({ message: "Correo de recuperación enviado" });
};

const resetPassword = async (req: Request, res: Response): Promise<void> => {
  const { token, newPassword, confirmPassword } = req.body;

  // Verificar que todos los campos estén presentes
  if (!token || !newPassword || !confirmPassword) {
    res.status(400).json({
      success: false,
      message: "Todos los campos son obligatorios.",
      errorId: 4,
    });
    return;
  }

  // Verificar que las nuevas contraseñas coincidan
  if (newPassword !== confirmPassword) {
    res.status(400).json({
      success: false,
      message: "Las contraseñas no coinciden.",
      errorId: 5,
    });
    return;
  }

  // Buscar el usuario con el token de restablecimiento
  const credentials = await UserCredentials.findOne({
    where: { reset_password_token: token },
  });

  if (!credentials) {
    res.status(404).json({
      success: false,
      message: "Token de restablecimiento inválido o expirado.",
      errorId: 8,
    });
    return;
  }

  // Verificar que el token no haya expirado
  const now = new Date();

  if (
    credentials.reset_password_expires == null ||
    credentials.reset_password_expires < now
  ) {
    res.status(400).json({
      success: false,
      message: "El token ha expirado.",
      errorId: 9,
    });

    return;
  }

  // Encriptar la nueva contraseña
  const hashedNewPassword = await bcrypt.hash(newPassword, 10);

  // Actualizar la contraseña en la base de datos
  credentials.password = hashedNewPassword;
  credentials.reset_password_token = null; // Limpiar el token
  credentials.reset_password_expires = null; // Limpiar la expiración

  await credentials.save();

  res.status(200).json({
    success: true,
    message: "Contraseña restablecida con éxito.",
  });
};

export { login, logout, register, deleteUser, updatePassword, restorePassword };
