import appointmentsRepositories from '../repositories/appointmentsRepositories.js';
import * as statusHelper from '../errors/statusHelper.js';
async function create(res, { date_time, doctor_id, description, patient_id }) {
  const {
    rows: [appointment]
  } = await appointmentsRepositories.findByTimestampAndDoctorId({
    date_time,
    doctor_id
  });

  if (appointment) return statusHelper.conflictResponse(res, 'appointment');

  await appointmentsRepositories.create({
    date_time,
    doctor_id,
    description,
    patient_id
  });

  return statusHelper.createdResponse(res, 'appointment');
}

export default { create };
