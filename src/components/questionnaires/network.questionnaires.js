const expres = require('express')
const passport = require('passport')

const router = expres.Router()

const validatorHandler = require('../../middlewares/validator.handle.js')
const response = require('../../middlewares/respone.handle.js')
const { validateCreateQuestionnaires, SendAnswer, isUuid } = require('./schema.questionnaires.js')

const { createdQuestionnaires, getAllQuestionnaires, getQuestionnaire, deleteQuestionnaire, getAllQuestionnairesByCode } = require('./controller.questionnaires.js')

const networkCreateQuestionnaires =
  async (req, res, next) => {
    try {
      const response = await createdQuestionnaires(req.user.id, req.body)
      res.locals.status = 201
      res.locals.message = response
      next()
    } catch (err) {
      next(err)
    }
  }

const networkGetAllQuestionnaires =
  async (req, res, next) => {
    try {
      const response = await getAllQuestionnaires(req.user.id)
      res.locals.status = 200
      res.locals.message = response
      next()
    } catch (err) {
      next(err)
    }
  }

const networkGetAQuestionnaires =
  async (req, res, next) => {
    try {
      const response = await getQuestionnaire(req.params.id)
      res.locals.status = 200
      res.locals.message = response
      next()
    } catch (err) {
      next(err)
    }
  }

const networkDeleteAQuestionnaires =
  async (req, res, next) => {
    try {
      const response = await deleteQuestionnaire(req.params.id)
      res.locals.status = 200
      res.locals.message = response
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
    const response = await getAllQuestionnairesByCode(req.params.code)
    res.locals.status = 200
    res.locals.message = response
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
router.get('/reply/:code',
  networkGetQuestionnairesDetail
  ,
  response
)
router.get('/',
  passport.authenticate('jwt', { session: false }),
  networkGetAllQuestionnaires
  ,
  response
)

router.get('/:id',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(isUuid, 'params'),
  networkGetAQuestionnaires
  ,
  response
)

router.post('/',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(validateCreateQuestionnaires, 'body'),
  networkCreateQuestionnaires
  ,
  response
)

router.delete('/:id',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(isUuid, 'params'),
  networkDeleteAQuestionnaires
  ,
  response
)

module.exports = router
