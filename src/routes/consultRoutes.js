import { Router } from 'express';
import consultsController from '../controllers/consultsControllers.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import { validateSchema } from '../middlewares/schemaValidationMiddleware.js';
import { consultSchema } from '../schemas/Consult.js';

const consultsRoutes = Router();

consultsRoutes.post(
  '/',
  authMiddleware.authValidation,
  validateSchema(consultSchema),
  consultsController.create
);

export default consultsRoutes;
