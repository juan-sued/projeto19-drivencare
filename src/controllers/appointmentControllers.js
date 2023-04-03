import appointmentsServices from '../services/appointmentServices.js';

async function create(req, res) {
  const { date_time, doctor_id, description } = req.body;
  const patient_id = res.locals.idUser;
  console.log(patient_id);
  try {
    await appointmentsServices.create(res, {
      date_time,
      doctor_id,
      description,
      patient_id
    });

    return res.sendStatus(201);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export default { create };
