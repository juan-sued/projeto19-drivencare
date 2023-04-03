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

async function getAppointments(res, { doctor_id }) {
  let appointments = [];

  if (doctor_id && !isNaN(doctor_id)) {
    const { rows: appointmentsOfDB } =
      await appointmentsRepositories.findByAllDaysOccupiedsOfDoctor({
        doctor_id
      });
    appointments = appointmentsOfDB;
  } else {
    const { rows: appointmentsOfDB } =
      await appointmentsRepositories.findByAll();
    appointments = appointmentsOfDB;
  }

  return statusHelper.okResponse(res, appointments);
}

export default { create, getAppointments };
