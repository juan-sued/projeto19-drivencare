import { Router } from 'express';
import consultRoutes from './consultRoutes.js';
import patientRoutes from './patientRoutes.js';

const routes = Router();

routes.use([patientRoutes, consultRoutes]);

export default routes;
