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

export default {
  findByEmail,
  create,
  findById
};
