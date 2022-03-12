const expres = require('express')

const router = expres.Router()

const validatorHandler = require('../../middlewares/validator.handle.js')
const response = require('../../middlewares/respone.handle.js')
const { validateCreateQuestionnaires, SendAnswer, isUuid } = require('./schema.questionnaires.js')

const networkCreateQuestionnaires =
  async (req, res, next) => {
    try {
      res.locals.status = 201
      res.locals.message = req.body
      next()
    } catch (err) {
      next(err)
    }
  }

const networkGetAllQuestionnaires =
  async (req, res, next) => {
    try {
      res.locals.status = 200
      res.locals.message = 'get all questionnaires'
      next()
    } catch (err) {
      next(err)
    }
  }

const networkGetAQuestionnaires =
  async (req, res, next) => {
    try {
      res.locals.status = 200
      res.locals.message = req.params
      next()
    } catch (err) {
      next(err)
    }
  }

const networkDeleteAQuestionnaires =
  async (req, res, next) => {
    try {
      res.locals.status = 200
      res.locals.message = req.params
      next()
    } catch (err) {
      next(err)
    }
  }

const networkSendAnswerQuestionnaires =
  async (req, res, next) => {
    try {
      res.locals.status = 200
      res.locals.message = req.body
      next()
    } catch (err) {
      next(err)
    }
  }

const networkGetQuestionnairesDetail = async (req, res, next) => {
  try {
    res.locals.status = 200
    res.locals.message = req.params
    next()
  } catch (err) {
    next(err)
  }
}

router.post('/reply',
  validatorHandler(SendAnswer, 'body'),
  networkSendAnswerQuestionnaires,
  response
)
router.get('/reply/:id',
  networkGetQuestionnairesDetail
  ,
  response
)
router.get('/',
  networkGetAllQuestionnaires
  ,
  response
)

router.get('/:id',
  validatorHandler(isUuid, 'params'),
  networkGetAQuestionnaires
  ,
  response
)

router.post('/',
  validatorHandler(validateCreateQuestionnaires, 'body'),
  networkCreateQuestionnaires
  ,
  response
)

router.delete('/:id',
  validatorHandler(isUuid, 'params'),
  networkDeleteAQuestionnaires
  ,
  response
)

module.exports = router
