const expres = require('express')

const router = expres.Router()

const validatorHandler = require('../../middlewares/validator.handle.js')
const response = require('../../middlewares/respone.handle.js')
const { createQuestionnaires, reciveAnswer, isUuid } = require('./schema.questionnaires.js')

router.get('/',
  async (req, res, next) => {
    try {
      res.locals.status = 200
      res.locals.message = 'get all questionnaires'
      next()
    } catch (err) {
      next(err)
    }
  }
  ,
  response
)

router.post('/reply',
  validatorHandler(reciveAnswer, 'body'),
  async (req, res, next) => {
    try {
      res.locals.status = 200
      res.locals.message = req.body
      next()
    } catch (err) {
      next(err)
    }
  }
  ,
  response
)
router.get('/reply/:id',
  async (req, res, next) => {
    try {
      res.locals.status = 200
      res.locals.message = req.params
      next()
    } catch (err) {
      next(err)
    }
  },
  response
)

router.get('/:id',
  validatorHandler(isUuid, 'params'),
  async (req, res, next) => {
    try {
      res.locals.status = 200
      res.locals.message = req.params
      next()
    } catch (err) {
      next(err)
    }
  }
  ,
  response
)

router.post('/',
  validatorHandler(createQuestionnaires, 'body'),
  async (req, res, next) => {
    try {
      res.locals.status = 201
      res.locals.message = req.body
      next()
    } catch (err) {
      next(err)
    }
  }
  ,
  response
)

router.delete('/:id',
  validatorHandler(isUuid, 'params'),
  async (req, res, next) => {
    try {
      res.locals.status = 200
      res.locals.message = req.params
      next()
    } catch (err) {
      next(err)
    }
  }
  ,
  response
)

module.exports = router
