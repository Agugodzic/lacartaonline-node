import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import UserCredentials from './UserCredentialsModel';
import User from '../userData/UserModel';

const userCredentials = UserCredentials;
const userModel = User;

const logout = (req: Request, res: Response): Response => {
  return res.json({ message: 'Logout exitoso' });
};

const deleteUser = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  await userCredentials.destroy({
    where: { id },
  });

  res.json({ message: 'Usuario eliminado' });
};

//errors:
// 1 - user already exist
// 2 - email already exist
// 3 - password or user incorrect

const register = async (req: Request, res: Response): Promise<void> => {
  const { user, password, name, province, address, email, phone, country } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await UserCredentials.findOne({ where: { user } });
  const existingEmail = await User.findOne({ where: { email } });

  if (existingUser) {
    res.json({ success: false, error: 'Error: User already exist.', errorId: 1 });
    return;
  }

  if (existingEmail) {
    res.json({ success: false, error: 'Error: Email already exist.', errorId: 2 });
    return;
  }

  const newUser = await userModel.create({
    name: name,
    province: province,
    email: email,
    phone: phone,
    country: country
  });

  await userCredentials.create({
    userId: newUser.id,
    user: user,
    password: hashedPassword
  });

  const secretKey = process.env.SECRET_KEY || ''; //eslint-disable-line
  const token = jwt.sign({ userId: newUser.id }, secretKey, { expiresIn: '24h' });

  res.json({
    success: true, error: 'No errors', errorId: 0, token: token, data: {
      ...newUser
    }
  })
};


const login = async (req: Request, res: Response): Promise<void> => {
  const { user, password, keepConnected } = req.body;

  const userCredential = await userCredentials.findOne({
    where: { user },
  });


  if (userCredential) {
    const isPasswordValid = await bcrypt.compare(password, userCredential.password);

    if (isPasswordValid) {
      const secretKey = process.env.SECRET_KEY || ''; //eslint-disable-line
      const userData = await userModel.findOne({
        where: { id: userCredential.userId || 0 },
      });

      const userId = userCredential.userId || 0;
      if (keepConnected === true) {
        const token = jwt.sign({ userId: userId }, secretKey, { expiresIn: '24h' });
        res.json({ success: true, message: 'Login success', token: token, userData: userData });
        return;

      } else {
        const token = jwt.sign({ userId: userId }, secretKey);
        res.json({ success: true, message: 'Login success', token: token, userData: userData });
        return;
      }
    }
  }

  res.json({ success: false, message: 'Usuario o contraseña incorrectos', token: false, errorId: 3 });
};


const updatePassword = async (req: Request, res: Response): Promise<void> => {
  const userid = req.userid;
  const { password, newPassword, confirmPassword } = req.body;

  if (!password || !newPassword || !confirmPassword) {
    res.json({ success: false, message: 'Todos los campos son obligatorios.', errorId: 4 });
    return;
  }

  // Verificar que las nuevas contraseñas coincidan
  if (newPassword !== confirmPassword) {
    res.json({ success: false, message: 'Las contraseñas no coinciden.', errorId: 5 });
    return;
  }

  // Buscar al usuario en la base de datos
  const userCredential = await UserCredentials.findOne({ where: { userId: userid } });

  if (!userCredential) {
    res.json({ success: false, message: 'Usuario no encontrado.', errorId: 6 });
    return;
  }

  // Verificar que la contraseña actual sea válida
  const isPasswordValid = await bcrypt.compare(password, userCredential.password);
  if (!isPasswordValid) {
    res.json({ success: false, message: 'Contraseña actual incorrecta.', errorId: 7 });
    return;
  }

  // Encriptar la nueva contraseña
  const hashedNewPassword = await bcrypt.hash(newPassword, 10);

  // Actualizar la contraseña en la base de datos
  await userCredential.update({ password: hashedNewPassword });

  res.json({ success: true, message: 'Contraseña actualizada con éxito.' });
};


export { login, logout, register, deleteUser, updatePassword };
