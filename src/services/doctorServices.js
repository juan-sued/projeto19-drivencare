import bcrypt from 'bcrypt';
import doctorRepositories from '../repositories/doctorRepositories.js';

import * as statusHelper from '../errors/statusHelper.js';

import * as jwtTokenServices from './jwtTokenServices.js';

async function create(
  res,
  { name, email, password, specialty, phone, locality, crm }
) {
  const { rowCount } = await doctorRepositories.findByEmail(email);
  if (rowCount) return statusHelper.conflictResponse(res, 'Doctor');

  const hashPassword = await bcrypt.hash(password, 10);
  await doctorRepositories.create({
    name,
    email,
    password: hashPassword,
    specialty,
    phone,
    locality,
    crm
  });
  return statusHelper.createdResponse(res);
}

async function signIn(res, { email, password }) {
  const {
    rowCount,
    rows: [doctor]
  } = await doctorRepositories.findByEmail(email);
  if (!rowCount) return statusHelper.notAuthorizedResponse(res);

  const validPassword = await bcrypt.compare(password, doctor.password);
  if (!validPassword) return statusHelper.notAuthorizedResponse(res);

  const token = jwtTokenServices.createToken(doctor.id, true);

  return statusHelper.okResponse(res, { token });
}

export default {
  create,
  signIn
};
