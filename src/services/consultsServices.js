import consultsRepositories from '../repositories/consultsRepositories.js';

async function create({ name, author, patientId }) {
  const {
    rows: [book]
  } = await consultsRepositories.findByName(name);
  if (book) throw new Error('Book already exists');

  await consultsRepositories.create({ name, author, patientId });
}

export default { create };
