import dotenv from 'dotenv';
import * as statusHelper from '../errors/statusHelper.js';
import doctorRepositories from '../repositories/doctorRepositories.js';

import * as patientRepositories from '../repositories/patientRepositories.js';
import { decodedToken } from '../services/jwtTokenServices.js';

dotenv.config();

async function validateJwtTokenMiddleware(request, response, next) {
  const token = request.header('Authorization')?.replace('Bearer ', '');

  if (!token) return statusHelper.notAuthorizedResponse(response, 'token');

  const payload = await decodedToken(response, token);
  let user = '';
  if (payload.isDoctor) {
    user = await doctorRepositories.findById(payload.id);
  } else {
    user = await patientRepositories.findById(payload.id);
  }

  if (!user) return statusHelper.notFoundResponse(response, 'Not found user');

  response.locals.idUser = payload.id;

  next();
}
export default validateJwtTokenMiddleware;
