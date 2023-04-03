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
  return statusHelper.createdResponse(res, 'Doctor');
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

async function getDoctors(res, { name, specialty, locality }) {
  let doctors = [];

  if (name) {
    const { rows: doctorsOfDB } = await doctorRepositories.findByName(name);
    doctors = doctorsOfDB;
  } else if (specialty) {
    const { rows: doctorsOfDB } = await doctorRepositories.findBySpaciality(
      specialty
    );
    doctors = doctorsOfDB;
  } else if (locality) {
    const { rows: doctorsOfDB } = await doctorRepositories.findByLocality(
      locality
    );
    doctors = doctorsOfDB;
  } else {
    const { rows: doctorsOfDB } = await doctorRepositories.findByAll();
    doctors = doctorsOfDB;
  }

  return statusHelper.okResponse(res, doctors);
}

export default {
  getDoctors,
  create,
  signIn
};
