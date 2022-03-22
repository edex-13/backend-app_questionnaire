const express = require('express')

const RouterQuestionnaires = require('../components/questionnaires/network.questionnaires')
const RouterAuth = require('../components/auth/network.auth')

const routerApi = (app) => {
  const router = express.Router()
  app.use('/api/v1', router)

  // Questionnaires
  router.use('/questionnaires', RouterQuestionnaires)
  // Auth
  router.use('/auth', RouterAuth)
}

module.exports = routerApi
