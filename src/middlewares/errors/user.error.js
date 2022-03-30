const userError = (err, req, res, next) => {
  let status = err.status || 500
  let message = err.message || 'Bad request'
  if (Array.isArray(err.errors)) {
    message = err.errors.map(error => error.message)
  }

  if (!err.isUserError) status = 400

  res.status(status).json({
    error: true,
    status,
    message
  })
}

module.exports = userError
