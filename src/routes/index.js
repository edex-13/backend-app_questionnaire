const express = require('express')

const RouterQuestionnaires = require('../components/questionnaires/network.questionnaires')

const routerApi = (app) => {
  const router = express.Router()
  app.use('/api/v1', router)

  // Questionnaires
  router.use('/questionnaires', RouterQuestionnaires)
}

module.exports = routerApi
