const Joi = require('joi')

const ID = Joi.string().uuid()

const createQuestionnaires = Joi.object().keys({
  name: Joi.string().required(),
  time: Joi.number().required().min(1),
  type: Joi.string().required().valid('a', 'b'),
  questions: Joi.array().items(Joi.object().keys({
    question: Joi.string().required(),
    answers: Joi.array().items(Joi.object().keys({
      response: Joi.string().required(),
      isCorrect: Joi.boolean().required()
    }))
  })).min(1).max(4)
})

const reciveAnswer = Joi.object().keys({
  idQuestionnaire: ID.required(),
  answers: Joi.array().items(Joi.object().keys({
    idQuestion: ID.required(),
    idAnswer: ID.required()
  }))
})

const isUuid = Joi.object().keys({
  id: ID.required()
})

module.exports = { createQuestionnaires, isUuid, reciveAnswer }
