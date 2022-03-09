const logError = (err, req, res, next) => {
  console.error('ERROR:' + err)
  next(err)
}
module.exports = logError
