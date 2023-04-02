import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import * as errors from '../errors/errorHelper.js';

dotenv.config();

const SECRET = process.env.SECRET_KEY || '!5S5G6$1AE@';
const EXPIRED_TIME = process.env.TOKEN_EXP_TIME || '24h';

const createToken = patientId => {
  const payload = { id: patientId };

  return jwt.sign(payload, SECRET, { expiresIn: EXPIRED_TIME });
};

async function decodedToken(res, token) {
  const decoded = jwt.verify(token, SECRET);
  if (!decoded) {
    throw errors.notAuthorizedResponse('Invalid Token');
  }
  return decoded;
}
export { createToken, decodedToken };
