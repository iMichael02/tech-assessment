import { validSymptoms } from '@/constants';
import Joi from 'joi';

export const createHealthDeclarationSchema = Joi.object({
  name: Joi.string().min(1).required(),
  temperature: Joi.number().positive().precision(1).required(),
  symptoms: Joi.array()
    .items(
      Joi.string()
        .valid(...validSymptoms)
        .required()
    )
    .required(),
  contactedWithCovid19Suspects: Joi.boolean().required(),
}).unknown(false);
