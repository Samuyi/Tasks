import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Users } from '../Models/models';


const params = {
    secretOrKey: '$Samuyi902210Pandorra£90',
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}

const strategy = new Strategy(params, (payload, done) => {
   console.log('payload',payload)
    const email = payload.email
    
    Users.findOne({email: email})
    .then(user => {
       return  done(null, {
            email: user.email,
            name: user.name 
        })
    })
    .catch(err => done(err))
});

passport.use(strategy);


export const init = function () {
        return passport.initialize();
    };
export const authenticate = function() {
       return  passport.authenticate('jwt', {session: false});
    }





