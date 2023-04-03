import { Router } from 'express';
import doctorControllers from '../controllers/doctorControllers.js';
import { validateSchema } from '../middlewares/schemaValidationMiddleware.js';
import validateJwtTokenMiddleware from '../middlewares/validateJwtTokenMiddleware.js';
import * as doctorSchemas from '../schemas/Doctor.js';

const doctorRoutes = Router();

doctorRoutes.post(
  '/doctors/sign-up',
  validateSchema(doctorSchemas.signUpSchema),
  doctorControllers.create
);
doctorRoutes.post(
  '/doctors/sign-in',
  validateSchema(doctorSchemas.signInSchema),
  doctorControllers.signIn
);

doctorRoutes.get(
  '/doctors/doctor',
  validateJwtTokenMiddleware,
  doctorControllers.getDoctors
);

export default doctorRoutes;
