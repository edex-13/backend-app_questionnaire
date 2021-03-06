const Joi = require('joi')

const ID = Joi.string().uuid()

const validateCreateQuestionnaires = Joi.object().keys({
  name: Joi.string().required(),
  questions: Joi.array().items(Joi.object().keys({
    question: Joi.string().required(),
    time: Joi.number().required().min(1),
    type: Joi.string().required().valid('trueAndfalse', 'multipleChoice', 'text'),
    answers: Joi.array().items(Joi.object().keys({
      response: Joi.string().required(),
      isCorrect: Joi.boolean().required()
    })).min(1).max(4)
  })).min(1)
})

const SendAnswer = Joi.object().keys({
  nameUser: Joi.string().required(),
  idQuestionnaire: ID.required(),
  answers: Joi.array().items(Joi.object().keys({
    BasicQuestionId: ID.required(),
    answer: Joi.string().required()
  }))
})

const isUuid = Joi.object().keys({
  id: ID.required()
})

module.exports = { validateCreateQuestionnaires, isUuid, SendAnswer }
