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
    return statusHelper.serverErrorResponse(res, err);
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

async function getDoctors(req, res) {
  const { name, specialty, locality } = req.query;

  try {
    const { rows: doctors } = await doctorServices.getDoctors(res, {
      name,
      specialty,
      locality
    });

    return res.status(200).send(doctors);
  } catch {
    return res.status(500).send('erro ao pegar doctors');
  }
}

export default {
  getDoctors,
  create,
  signIn
};
