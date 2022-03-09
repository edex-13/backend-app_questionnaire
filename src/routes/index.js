const express = require('express')

export const routerApi = (app) => {
  const router = express.Router()
  app.use('/api/v1', router)
}
