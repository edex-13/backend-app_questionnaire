const { models } = require('../../db/connection')

const generateCode = () => {
  const min = 100000
  const max = 999999
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const createdQuestionnaires = async (data) => {
  const code = generateCode()
  const { name } = data
  const newQuestionnaires = {
    name,
    code
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

module.exports = {
  createdQuestionnaires
}
