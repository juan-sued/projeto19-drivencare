import { Router } from 'express';
import appointmentRoutes from './appointmentRoutes.js';
import doctorRoutes from './doctorsRoutes.js';
import patientRoutes from './patientRoutes.js';

const routes = Router();

routes.use([patientRoutes, doctorRoutes, appointmentRoutes]);

export default routes;
