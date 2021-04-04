import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'

import { UserModel as User } from '../models/index.js'
import { JWT_SECRETE } from '../utils/index.js'

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
