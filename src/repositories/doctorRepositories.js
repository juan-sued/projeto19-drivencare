import connectionDb from '../config/database.js';

async function findByEmail(email) {
  return await connectionDb.query(
    `    
    SELECT * FROM doctors WHERE email=$1
  `,
    [email]
  );
}

async function create({
  name,
  email,
  password,
  specialty,
  phone,
  locality,
  crm
}) {
  await connectionDb.query(
    `
        INSERT INTO doctors (name, email, password, specialty, phone, locality, crm)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
    `,
    [name, email, password, specialty, phone, locality, crm]
  );
}

async function findById(id) {
  return await connectionDb.query(
    `    
    SELECT * FROM doctors WHERE id=$1
  `,
    [id]
  );
}

async function findByLocality(locality) {
  console.log;
  return await connectionDb.query(
    `SELECT * FROM doctors WHERE doctors.locality ILIKE $1;`,
    [locality + '%']
  );
}
async function findByName(name) {
  return await connectionDb.query(
    `SELECT * FROM doctors WHERE doctors.name ILIKE $1;`,
    [name + '%']
  );
}
async function findBySpaciality(specialty) {
  return await connectionDb.query(
    `SELECT * FROM doctors WHERE doctors.specialty ILIKE $1;`,
    [specialty + '%']
  );
}

async function findByAll() {
  return await connectionDb.query(`SELECT * FROM doctors;`);
}

export default {
  findBySpaciality,
  findByAll,
  findByName,
  findByLocality,
  findByEmail,
  create,
  findById
};
