import Joi from "joi";





export const bodyUpload = Joi.object({
    image: Joi.string().required(),
    customer_code: Joi.string().required(),
    measure_datetime: Joi.date().iso().required(),
    measure_type: Joi.string().valid("WATER" , "GAS").required()
});

export const bodyPatch = Joi.object({
    measure_uuid: Joi.string().uuid({ version: 'uuidv4' }).required(),
    confirmed_value: Joi.number().required(),
});