import connectionDb from '../config/database.js';

async function create({ date_time, doctor_id, description, patient_id }) {
  await connectionDb.query(
    `
        INSERT INTO appointments (date_time, doctor_id, description, patient_id)
        VALUES ($1, $2, $3, $4)
        `,
    [date_time, doctor_id, description, patient_id]
  );
}

async function findById(id) {
  return await connectionDb.query(
    `
        SELECT * FROM appointments WHERE id = $1;
    `,
    [id]
  );
}
async function findByTimestampAndDoctorId({ date_time, doctor_id }) {
  return await connectionDb.query(
    `
        SELECT * FROM appointments WHERE date_time = $1 AND doctor_id = $2;
    `,
    [date_time, doctor_id]
  );
}

export default { create, findById, findByTimestampAndDoctorId };
