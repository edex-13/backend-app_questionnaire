const userError = (err, req, res, next) => {
  let status = err.status || 400
  const message = err.message || 'Ha ocurrido un error'
  if (!err.isUserError) status = 500

  res.status(status).json({
    error: true,
    status,
    message
  })
}

module.exports = userError
