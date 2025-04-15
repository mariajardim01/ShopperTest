import errors from "../errors/BodyError.js";

export function schemaValidation(schema) {
    return (req, res, next) => {
        const validation = schema.validate(req.body, { abortEarly: false });
        
        if (validation.error) {
            let message = validation.error.details.map((error) => error.message);
          throw errors.invalidBody(message)
          
        }
        
        next();
      };
}