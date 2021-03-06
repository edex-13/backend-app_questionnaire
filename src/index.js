const express = require('express')
const dotenv = require('dotenv')
dotenv.config()
const cors = require('cors')
const routerApi = require('./routes')
const logError = require('./middlewares/errors/log.error')
const userError = require('./middlewares/errors/user.error')

require('./utils/auth')

const app = express()

const PORT = process.env.PORT || 3000

app.use(express.json())

app.use(cors())
routerApi(app)
app.use((req, res, next) => {
  next({
    isUserError: true,
    status: 404,
    message: 'resource not found'
  })
})
app.use(logError)
app.use(userError)

app.listen(PORT, () => {
  console.log(`App listening in port: ${PORT}!`)
})
