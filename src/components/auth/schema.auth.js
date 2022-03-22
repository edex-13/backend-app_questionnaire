const joi = require('joi')

// login
const validateLogin = joi.object().keys({
  email: joi.string().email().required(),
  password: joi.string().required()
})
// register
const validateRegister = joi.object().keys({
  email: joi.string().email().required(),
  password: joi.string().required().min(6),
  name: joi.string().required()
})

module.exports = {
  validateLogin,
  validateRegister
}
