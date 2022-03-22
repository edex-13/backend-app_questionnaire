const { Strategy, ExtractJwt } = require('passport-jwt')

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_KEY
}

const JwtStrategy = new Strategy(options, (payload, done) => {
  return done(null, payload)
})

module.exports = JwtStrategy
