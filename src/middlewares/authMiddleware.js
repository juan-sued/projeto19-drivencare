import patientRepositories from '../repositories/patientRepositories.js';

async function authValidation(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace('Bearer ', '');

  if (!token) return res.status(401).send('No token');

  try {
    const {
      rows: [session]
    } = await patientRepositories.findSessionByToken(token);
    if (!session) return res.status(401).send('Session not found');

    const {
      rows: [patient]
    } = await patientRepositories.findById(session.patientId);
    if (!patient) return res.status(401).send('patient not found');

    res.locals.patient = patient;
    next();
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export default { authValidation };
