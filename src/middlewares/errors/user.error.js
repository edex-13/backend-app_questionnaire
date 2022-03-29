const userError = (err, req, res, next) => {
  let status = err.status || 500
  const message = err.errors[0].message || err.message || 'Bad request'
  if (!err.isUserError) status = 400

  res.status(status).json({
    error: true,
    status,
    message
  })
}

module.exports = userError
