import joi from 'joi';

export const consultSchema = joi.object({
  name: joi.string().min(2).required(),
  author: joi.string().required(),
  patientId: joi.number(),
  available: joi.boolean().default(true)
});
