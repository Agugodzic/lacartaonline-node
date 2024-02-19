import jwt from 'jsonwebtoken';

function authenticateToken(req, res, next) {
  const secretKey = process.env.SECRET_KEY; //eslint-disable-line
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ error: 'Access denied. Token not provided.' });
  }

  jwt.verify(token, secretKey , (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token.' });
    }
    
    req.user = user;
    next();
  });
}

export default authenticateToken;