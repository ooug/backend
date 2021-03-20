import { default as passport } from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { userModel as User } from '../models/user.model';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';

// configuring local strategy
passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    (email, password, done) => {
      User.findOne({ email: email })
        .then((user: any) => {
          if (!user) {
            return done(null, false, { message: 'Incorrect Email' });
          }
          if (user.password === password) {
            return done(null, user);
          } else {
            return done(null, false, { message: 'Incorrect Password' });
          }
        })
        .catch((err) => {
          return done(err);
        });
    }
  )
);

// configuring jwt strategy
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'ooug2011',
    },
    (jwtPayload, done) => {
      User.findOne({ _id: jwtPayload.sub })
        .then((user: any) => {
          if (!user) {
            return done(null, false);
          }
          return done(null, user);
        })
        .catch((err) => {
          return done(err, false);
        });
    }
  )
);
