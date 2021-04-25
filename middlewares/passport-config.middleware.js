const passport = require('passport')
const { Strategy: LocalStrategy } = require('passport-local')
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt')

const { UserModel: User } = require('../models')
const { JWT_SECRETE } = require('../utils')

// configuring local strategy
passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password'
    },
    (email, password, done) => {
      User.findOne({ email: email })
        .then(
          /**
           * @param {*} user
           */
          (user) => {
            if (!user) {
              return done(null, false, { message: 'Incorrect Email' })
            }
            if (user.password === password) {
              return done(null, user)
            } else {
              return done(null, false, { message: 'Incorrect Password' })
            }
          }
        )
        .catch((err) => {
          return done(err)
        })
    }
  )
)

// configuring jwt strategy
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: JWT_SECRETE
    },
    (jwtPayload, done) => {
      User.findOne({ _id: jwtPayload.sub })
        .then((user) => {
          if (!user) {
            return done(null, false)
          }
          return done(null, user)
        })
        .catch((err) => {
          return done(err, false)
        })
    }
  )
)
