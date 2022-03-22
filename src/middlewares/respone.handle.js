const respone = (req, res, next) => {
  const status = res.locals.status || 200
  const message = res.locals.message || {}
  res.status(status).json({
    error: false,
    status,
    message
  })
}

module.exports = respone
