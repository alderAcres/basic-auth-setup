const Joi = require('@hapi/joi');
//register validation
const registerValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string()
    .min(6)
    .required(),
    email : Joi.string()
    .min(6)
    .required()
    .email(),
    password: Joi.string()
    .min(6)
    .required()
  });
  const regValidation = schema.validate(data)
  return regValidation;
}

const loginValidation = (data) => {
  const schema = Joi.object({
    email : Joi.string()
    .min(6)
    .required()
    .email(),
    password: Joi.string()
    .min(6)
    .required()
  });
  const logValidation = schema.validate(data)
  return logValidation;
}
module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;