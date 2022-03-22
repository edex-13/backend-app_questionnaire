const validatorHandler = (schema, property) => {
  return (req, res, next) => {
    const data = req[property]
    const { error } = schema.validate(data, { abortEarly: false })
    if (error) {
      next({
        isUserError: true,
        status: 400,
        message: `Data error ${error} `
      })
    }
    next()
  }
}

module.exports = validatorHandler
