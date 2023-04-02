import connectionDb from '../config/database.js';

async function create({ name, author, patientId }) {
  await connectionDb.query(
    `
        INSERT INTO consults (name, author, "patientId")
        VALUES ($1, $2, $3)
        `,
    [name, author, patientId]
  );
}

async function findByName(name) {
  return await connectionDb.query(
    `
        SELECT * FROM consults WHERE name = $1;
    `,
    [name]
  );
}

export default { create, findByName };
