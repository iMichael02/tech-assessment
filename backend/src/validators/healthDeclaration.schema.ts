import { validSymptoms } from '@/constants/symptoms';
import Joi from 'joi';

export const createHealthDeclarationSchema = Joi.object({
  name: Joi.string()
    .min(1)
    .regex(/^[A-Za-z ]+$/)
    .required(),
  temperature: Joi.number().positive().precision(1).required().strict(),
  symptoms: Joi.array()
    .items(
      Joi.string()
        .valid(...validSymptoms)
        .required()
    )
    .required(),
  contactedWithCovid19Suspects: Joi.boolean().required(),
}).unknown(false);
