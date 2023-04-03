import Joi from 'joi';

export const appointmentSchema = Joi.object({
  date_time: Joi.date().iso().required(),
  doctor_id: Joi.number().integer().positive().required(),
  description: Joi.string().allow('').optional()
});
