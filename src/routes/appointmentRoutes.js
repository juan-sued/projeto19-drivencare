import { Router } from 'express';
import appointmentsController from '../controllers/appointmentControllers.js';
import { validateSchema } from '../middlewares/schemaValidationMiddleware.js';
import validateJwtTokenMiddleware from '../middlewares/validateJwtTokenMiddleware.js';
import { appointmentSchema } from '../schemas/Appointment.js';

const appointmentsRoutes = Router();

appointmentsRoutes.post(
  '/appointments',
  validateJwtTokenMiddleware,
  validateSchema(appointmentSchema),
  appointmentsController.create
);

export default appointmentsRoutes;
