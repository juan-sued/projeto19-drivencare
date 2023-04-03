import Joi from 'joi';

export const signUpSchema = Joi.object({
  name: Joi.string().trim().required().min(1),
  email: Joi.string().email().trim().required().min(1),
  password: Joi.string().trim().required().min(1),
  confirmPassword: Joi.ref('password'),
  specialty: Joi.string().trim().required().min(1),
  phone: Joi.string().trim().min(10).max(12),
  locality: Joi.string().trim().required().min(1),
  crm: Joi.string()
    .regex(/^CRM\/[A-Z]{2} \d{6}$/)
    .required()
});

export const signInSchema = Joi.object({
  email: Joi.string().email().trim().required().min(1),
  password: Joi.string().trim().required().min(1)
});
