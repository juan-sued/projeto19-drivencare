import * as statusHelper from '../errors/statusHelper.js';
import doctorServices from '../services/doctorServices.js';

async function create(req, res) {
  const { name, email, password, specialty, phone, locality, crm } = req.body;
  try {
    await doctorServices.create(res, {
      name,
      email,
      password,
      specialty,
      phone,
      locality,
      crm
    });
  } catch (err) {
    return statusHelper.serverErrorResponse(res);
  }
}

async function signIn(req, res) {
  const { email, password } = req.body;
  try {
    await doctorServices.signIn(res, { email, password });
  } catch (err) {
    return statusHelper.serverErrorResponse(res);
  }
}

export default {
  create,
  signIn
};
