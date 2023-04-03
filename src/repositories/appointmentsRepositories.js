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

async function findByDayOccupied({ date_time, doctor_id }) {
  //return true or false case all hours ocuppieds
  return await connectionDb.query(
    `
    SELECT CASE WHEN COUNT(*) = 11 THEN true ELSE false END AS all_Hours_Occupies FROM appointments WHERE doctor_id = $1 AND date_trunc('day', date_time) = TIMESTAMP $2;
    `,
    [doctor_id, date_time]
  );
}

async function findByAllDaysOccupiedsOfDoctor({ doctor_id }) {
  //return all days occupieds
  return await connectionDb.query(
    `
    SELECT date_trunc('day', date_time) AS day
    FROM appointments
    WHERE doctor_id = $1
    GROUP BY day
    HAVING COUNT(*) = 11;
    `,
    [doctor_id]
  );
}

async function findByAll() {
  return await connectionDb.query(
    `
    SELECT * FROM appointments;
    `
  );
}

export default {
  findByAll,
  findByAllDaysOccupiedsOfDoctor,
  create,
  findById,
  findByTimestampAndDoctorId,
  findByDayOccupied
};
