const expres = require('express')

const router = expres.Router()

router.get('/', (req, res) => {
  res.json({
    message: 'Hello world'
  })
})

module.exports = router
