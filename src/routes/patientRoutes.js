import { Router } from 'express';
import patientControllers from '../controllers/patientControllers.js';
import { validateSchema } from '../middlewares/schemaValidationMiddleware.js';
import * as patientSchemas from '../schemas/Patient.js';

const patientRoutes = Router();
console.log('entrou');
patientRoutes.post(
  '/patients/sign-up',
  validateSchema(patientSchemas.signUpSchema),
  patientControllers.create
);
patientRoutes.post(
  '/patients/sign-in',
  validateSchema(patientSchemas.signInSchema),
  patientControllers.signIn
);

export default patientRoutes;
