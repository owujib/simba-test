const JOI = require('joi');

exports.registerValidation = (data) => {
  const schema = JOI.object({
    name: JOI.string().required().max(20).messages({
      'any.base': `{{#label}} should be a type of 'text'`,
      'any.required': `{{#label}} cannot be an empty field`,
      'any.max': `{{#label}} should have a minimum length of {#limit}`,
    }),
    email: JOI.string().required().email().lowercase().messages({
      'string.base': `{{#label}} should be a type of 'text'`,
      'string.email': `{{#label}} cannot be an empty field`,
      'string.lowercase': `{{#label}} must be in lower case`,
    }),
    password: JOI.string().required().min(6).max(12).messages({
      'string.base': `{{#label}} should be a type of 'text'`,
      'string.required': `{{#label}} cannot be an empty field`,
      'string.min': `{{#label}} cannot be an empty field`,
      'string.max': `{{#label}} cannot be an empty field`,
    }),
    confirmPassword: JOI.string()
      .required()
      .valid(JOI.ref('password'))
      .messages({
        'any.base': `{{#label}} must be a string`,
        'any.required': `{{#label}} is required and cannot be left empty`,
        'any.valid': `{{#label}} does not match with password`,
      }),
  });

  return schema.validate(data);
};
exports.loginValidation = (data) => {
  const schema = JOI.object({
    email: JOI.string().required().email().messages({
      'string.base': `{{#label}} should be a type of 'text'`,
      'string.email': `{{#label}} cannot be an empty field`,
    }),
    password: JOI.string().required().min(6).max(12).messages({
      'string.base': `{{#label}} should be a type of 'text'`,
      'string.required': `{{#label}} cannot be an empty field`,
      'string.min': `{{#label}} cannot be an empty field`,
      'string.max': `{{#label}} cannot be an empty field`,
    }),
  });
  return schema.validate(data);
};
