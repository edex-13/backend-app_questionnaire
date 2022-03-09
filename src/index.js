const express = require('express')
const app = express()

const { routerApi } = require('./routes')

const PORT = process.env.PORT || 3000

app.use(express.json())

routerApi(app)

app.listen(PORT, () => {
  console.log(`App listening in port: ${PORT}!`)
})
