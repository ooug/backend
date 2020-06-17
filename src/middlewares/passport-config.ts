import { default as passport } from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { userModel as User } from '../models/user';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env._PASSPORT_KEY
};

passport.use(new LocalStrategy(
  {
    usernameField:'email',
    passwordField:'password'
  },
  (email,password,done)=>{
    User.findOne({email:email}).then((user:any)=>{
      if(!user){
        return done(null,false,{message:'Incorrect Email'});
      }
      if(user.password===password){
        return done(null,user);
      }else{
        return done(null,false,{message:'Incorrect Password'});
      }
    }).catch((err)=>{
      return done(err);
    })
  }
));


