import consultsServices from '../services/consultsServices.js';

async function create(req, res) {
  const { name, author } = req.body;

  const { id } = res.locals.patient;
  try {
    await consultsServices.create({ name, author, patientId: id });

    return res.sendStatus(201);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export default { create };
