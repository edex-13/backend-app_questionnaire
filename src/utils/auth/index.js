const passport = require('passport')

const JwtStrategy = require('./jwt')

passport.use(JwtStrategy)
