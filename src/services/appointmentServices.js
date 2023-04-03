import appointmentsRepositories from '../repositories/appointmentsRepositories.js';
import * as errors from '../errors/statusHelper.js';
async function create(res, { date_time, doctor_id, description, patient_id }) {
  const {
    rows: [appointment]
  } = await appointmentsRepositories.findByTimestampAndDoctorId(
    date_time,
    doctor_id
  );
  if (appointment) return errors.conflictResponse(res, 'appointment');

  const { rows: appointments } = await appointmentsRepositories.findById(13);
  if (appointments) {
    console.log(appointments[0].date_time.toLocaleString());
  }

  await appointmentsRepositories.create({
    date_time,
    doctor_id,
    description,
    patient_id
  });
}

export default { create };
