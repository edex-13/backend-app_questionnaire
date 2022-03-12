const logError = (err, req, res, next) => {
  console.error('ERROR: ' + err.message)
  next(err)
}
module.exports = logError
