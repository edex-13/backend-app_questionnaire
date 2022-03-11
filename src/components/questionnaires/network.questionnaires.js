const expres = require('express')

const router = expres.Router()

const validatorHandler = require('../../middlewares/validator.handle.js')
const response = require('../../middlewares/respone.handle.js')
const { validateCreateQuestionnaires, SendAnswer, isUuid } = require('./schema.questionnaires.js')

const createQuestionnaires =
  async (req, res, next) => {
    try {
      res.locals.status = 201
      res.locals.message = req.body
      next()
    } catch (err) {
      next(err)
    }
  }

const getAllQuestionnaires =
  async (req, res, next) => {
    try {
      res.locals.status = 200
      res.locals.message = 'get all questionnaires'
      next()
    } catch (err) {
      next(err)
    }
  }

const getAQuestionnaires =
  async (req, res, next) => {
    try {
      res.locals.status = 200
      res.locals.message = req.params
      next()
    } catch (err) {
      next(err)
    }
  }

const deleteAQuestionnaires =
  async (req, res, next) => {
    try {
      res.locals.status = 200
      res.locals.message = req.params
      next()
    } catch (err) {
      next(err)
    }
  }

const SendAnswerQuestionnaires =
  async (req, res, next) => {
    try {
      res.locals.status = 200
      res.locals.message = req.body
      next()
    } catch (err) {
      next(err)
    }
  }

const getQuestionnairesDetail = async (req, res, next) => {
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
  SendAnswerQuestionnaires,
  response
)
router.get('/reply/:id',
  getQuestionnairesDetail
  ,
  response
)
router.get('/',
  getAllQuestionnaires
  ,
  response
)

router.get('/:id',
  validatorHandler(isUuid, 'params'),
  getAQuestionnaires
  ,
  response
)

router.post('/',
  validatorHandler(validateCreateQuestionnaires, 'body'),
  createQuestionnaires
  ,
  response
)

router.delete('/:id',
  validatorHandler(isUuid, 'params'),
  deleteAQuestionnaires
  ,
  response
)

module.exports = router
