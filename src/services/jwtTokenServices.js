import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import * as errors from '../errors/statusHelper.js';

dotenv.config();

const SECRET = process.env.SECRET_KEY || '!5S5G6$1AE@';
const EXPIRED_TIME = process.env.TOKEN_EXP_TIME || '24h';

const createToken = (userId, isDoctor = false) => {
  const payload = { id: userId, isDoctor: isDoctor };

  return jwt.sign(payload, SECRET, { expiresIn: EXPIRED_TIME });
};

async function decodedToken(res, token) {
  const decoded = jwt.verify(token, SECRET);

  if (!decoded) return errors.notAuthorizedResponse(res, 'Invalid Token');

  return decoded;
}
export { createToken, decodedToken };
