const { models } = require('../../db/connection')

const generateCode = () => {
  const min = 100000
  const max = 999999
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const createdQuestionnaires = async (idUser, data) => {
  const code = generateCode()
  const { name } = data
  const newQuestionnaires = {
    name,
    code,
    user: idUser
  }
  const questionnaires = await models.Questionnaires.create(newQuestionnaires)
  const { id: idquestionnaires } = questionnaires
  const { questions } = data

  questions.map(async (question) => {
    const { question: questionText, time, type } = question
    const newBasicQuestions = {
      idQuestionnaire: idquestionnaires,
      question: questionText,
      time,
      type
    }
    const basicQuestions = await models.BasicQuestions.create(newBasicQuestions)
    const { id } = basicQuestions
    const { answers } = question
    answers.map(async (answer) => {
      const { response, isCorrect } = answer
      const newBasicAnswers = {
        idBasicQuestion: id,
        idQuestionnaire: idquestionnaires,
        answer: response,
        isCorrect
      }

      return await models.BasicAnswers.create(newBasicAnswers)
    })

    return basicQuestions
  })
  return questionnaires
}

const getAllQuestionnaires = async (id) => {
  const questionnaires = await models.Questionnaires.findAll({
    where: {
      user: id
    }
  }
  )
  return questionnaires
}
const getQuestionnaire = async (id) => {
  const questionnaires = await models.Questionnaires.findOne({
    where: {
      id
    }
  })
  return questionnaires
}
const deleteQuestionnaire = async (id) => {
  const questionnaires = await models.Questionnaires.destroy({
    where: {
      id
    }
  })
  return questionnaires
}

const getAllQuestionnairesByCode = async (code) => {
  const questionnaires = await models.Questionnaires.findOne({
    where: {
      code
    }
  })
  const { id } = questionnaires
  const basicQuestions = await models.BasicQuestions.findAll({
    where: {
      idQuestionnaire: id
    }
  })
  const basicAnswers = await models.BasicAnswers.findAll({
    where: {
      idQuestionnaire: id
    }
  })
  const response = basicQuestions.map((basicQuestion) => {
    const { id: idBasicQuestion, question, time, type } = basicQuestion

    const answersdb = basicAnswers.filter((basicAnswer) => {
      return basicAnswer.idBasicQuestion === idBasicQuestion
    })
    const answers = answersdb.map((answer) => {
      delete answer.dataValues.isCorrect
      delete answer.dataValues.createdAt
      delete answer.dataValues.idBasicQuestion
      delete answer.dataValues.idQuestionnaire
      return answer
    })
    return {

      idBasicQuestion,
      question,
      time,
      type,
      answers

    }
  })

  return {
    id,
    code,
    name: questionnaires.name,
    questions: response

  }
}

module.exports = {
  createdQuestionnaires,
  getAllQuestionnaires,
  getQuestionnaire,
  deleteQuestionnaire,
  getAllQuestionnairesByCode
}
