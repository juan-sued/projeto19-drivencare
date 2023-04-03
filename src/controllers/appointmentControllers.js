import appointmentsServices from '../services/appointmentServices.js';

async function create(req, res) {
  const { date_time, doctor_id, description } = req.body;
  const patient_id = res.locals.idUser;

  try {
    await appointmentsServices.create(res, {
      date_time,
      doctor_id,
      description,
      patient_id
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
}

async function getAppointments(req, res) {
  const { doctor_id } = req.query;

  try {
    const { rows: appointments } = await appointmentsServices.getAppointments(
      res,
      {
        doctor_id
      }
    );

    return res.status(200).send(appointments);
  } catch {
    return res.status(500).send('erro ao pegar appointments');
  }
}

export default { create, getAppointments };
