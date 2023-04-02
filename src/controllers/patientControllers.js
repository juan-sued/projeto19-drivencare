import * as errors from '../errors/errorHelper.js';
import patientServices from '../services/patientServices.js';

async function create(req, res) {
  const { name, email, password } = req.body;
  try {
    await patientServices.create(res, { name, email, password });
    return res.sendStatus(201);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

async function signIn(req, res) {
  const { email, password } = req.body;
  try {
    const token = await patientServices.signIn({ email, password });
    return res.send({ token });
  } catch (err) {
    return errors.serverErrorResponse();
  }
}

export default {
  create,
  signIn
};
