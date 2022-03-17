const expres = require('express')

const router = expres.Router()

const validatorHandler = require('../../middlewares/validator.handle.js')
const response = require('../../middlewares/respone.handle.js')

const { validateLogin, validateRegister } = require('./schema.auth.js')

const networkLogin = async (req, res, next) => {
  try {
    const response = req.body
    res.locals.status = 200
    res.locals.message = response
    next()
  } catch (err) {
    next(err)
  }
}
const networkRegister = async (req, res, next) => {
  try {
    const response = req.body
    res.locals.status = 200
    res.locals.message = response
    next()
  } catch (err) {
    next(err)
  }
}

router.post('/login',
  validatorHandler(validateLogin),
  networkLogin,
  response
)

router.post('/register',
  validatorHandler(validateRegister),
  networkRegister,
  response
)

module.exports = router
