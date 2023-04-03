import bcrypt from 'bcrypt';
import * as patientRepositories from '../repositories/patientRepositories.js';

import * as errors from '../errors/statusHelper.js';

import * as jwtTokenServices from '../services/jwtTokenServices.js';

async function create(res, { name, email, password }) {
  const { rowCount } = await patientRepositories.findByEmail(email);
  if (rowCount) throw errors.conflictResponse(res, 'Pacient');

  const hashPassword = await bcrypt.hash(password, 10);
  await patientRepositories.create({ name, email, password: hashPassword });
}

async function signIn({ email, password }) {
  const {
    rowCount,
    rows: [patient]
  } = await patientRepositories.findByEmail(email);
  if (!rowCount) throw errors.notAuthorizedResponse();

  const validPassword = await bcrypt.compare(password, patient.password);
  if (!validPassword) throw errors.notAuthorizedResponse();

  const token = jwtTokenServices.createToken(patient.id);

  return token;
}

export default {
  create,
  signIn
};
