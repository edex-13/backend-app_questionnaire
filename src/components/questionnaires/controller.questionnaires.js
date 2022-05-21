const { models } = require('../../db/connection')
const sendMail = require('../../utils/email')

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
const responseQuestionnaire = async ({ nameUser, idQuestionnaire, answers: answersUser }) => {
  let countCorrect = 0
  let numberOfQuestions = 0
  let wrongAnswers = 0

  const questions = await models.BasicQuestions.findAll({
    where: {
      idQuestionnaire
    }
  })
  numberOfQuestions = questions.length
  await Promise.all(questions.map(async (question) => {
    const { id } = question
    const { dataValues: responseCorrectDB } = await models.BasicAnswers.findOne({
      where: {
        idBasicQuestion: id,
        isCorrect: true
      }
    })

    for (let i = 0; i < answersUser.length; i++) {
      const { BasicQuestionId: idBasicQuestionUser, answer: answerUser } = answersUser[i]
      if (idBasicQuestionUser !== responseCorrectDB.idBasicQuestion) {
        break
      }
      if (question.type === 'text') {
        if (answerUser === responseCorrectDB.answer) {
          countCorrect++
          break
        }
      } else {
        if (answerUser === responseCorrectDB.id) {
          countCorrect++
          break
        }
      }
    }
  }))
  wrongAnswers = numberOfQuestions - countCorrect

  await models.ResponseQuestions.create({
    idQuestionnaire,
    name_user: nameUser,
    correct_answers: countCorrect,
    wrong_answers: wrongAnswers
  })
  const a = await models.ResponseQuestions.findAll()
  // html de correo
  const html = `
  <h1>Resultados de la encuesta</h1>
  <p>Nombre: ${nameUser}</p>
  <p>Total de preguntas: ${numberOfQuestions}</p>
  <p>Respuestas correctas: ${countCorrect}</p>
  <p>Respuestas incorrectas: ${wrongAnswers}</p>
  `
  await sendMail('rodol123x@gmailc.om', html, 'oli')
  return { numberOfQuestions, countCorrect, wrongAnswers }
}
const getResultsQuestionnaires = async (id) => {
  const responseQuestions = await models.ResponseQuestions.findAll({
    where: {
      idQuestionnaire: id

    },
    order: [
      ['correct_answers', 'DESC']
    ],
    attributes: ['correct_answers', 'wrong_answers', 'name_user']
  })

  return responseQuestions
}

module.exports = {
  createdQuestionnaires,
  getAllQuestionnaires,
  getQuestionnaire,
  deleteQuestionnaire,
  getAllQuestionnairesByCode,
  responseQuestionnaire,
  getResultsQuestionnaires
}
