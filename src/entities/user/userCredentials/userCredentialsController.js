import bcrypt from 'bcrypt';
import UserCredentials from './UserCredentialsModel.js';
import jwt from 'jsonwebtoken';
import User from '../userData/UserModel.js';

const userCredentials = UserCredentials;
const userModel = User;

const logout = (req, res) => {
  return res.json({ message: 'Logout exitoso' });
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  await userCredentials.destroy({
    where: { id },
  });

  return res.json({ message: 'Usuario eliminado exitosamente' });
};


const register = async (req, res) => {
  const { user, password, name, province, address, email, phone, country } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10); 

  const existingUser = await userCredentials.findOne({ user });

  if (existingUser) {
    return res.status(400).json({ success:false, error:'Error: User already exist.' ,errorId:1});
  }

  const newUser = await userModel.create({
    name:name,
    province:province,
    address:address,
    email:email,
    phone:phone,
    country:country
  });

  const newUserCredentials = await userCredentials.create({
    userId:newUser.id,
    user:user,
    password: hashedPassword
  });
 
  return res.json({   
    ...newUserCredentials, 
    ...newUser
  })
};


const login = async (req, res) => {
  const { user, password, keepConnected } = req.body;

  const userCredential = await userCredentials.findOne({
    where: { user },
  });

  if (userCredential) {
    const isPasswordValid = await bcrypt.compare(password, userCredential.password);

    if (isPasswordValid) {
      const secretKey = process.env.SECRET_KEY; //eslint-disable-line

      const userId = userCredential.userId || 0;
      if(keepConnected === true){
        const token = jwt.sign({userId:userId},secretKey,{expiresIn:'24h'});
        return res.json({ message: 'Login success', token:token });
      }else{
        const token = jwt.sign({userId:userId},secretKey);
        return res.json({ message: 'Login success', token:token });
      }
    }
  }

  return res.status(401).json({ message: 'Credenciales incorrectas',token:false});
};

export { login, logout, register, deleteUser };
