import passport from "passport";
import local from "passport-local"
import passportGoogle from "passport-google-oauth20";
import { userModel } from "../models/user.model.js";
import { createHash, isValidPassword} from "../utils/bcrypt.js";
import { Command } from "commander";
import { getVariables } from "./config.js";
import findOrCreate from "mongoose-findorcreate";

const LocalStrategy = local.Strategy;
const googleStrategy = passportGoogle.Strategy

const program = new Command()
program.option('--mode <mode>', 'Modo de trabajo', 'development')
const options = program.parse()
const{CLIENT_ID,SECRET_CLIENT} = getVariables(options)



const initializePassport = ()=>{
    passport.use('register', new LocalStrategy(
    {passReqToCallback: true, usernameField: 'email'},
    async(req,username, password, done) =>{
        const {first_name, last_name, email, age} = req.body;
        const rol = 'user'
        try {
            const user = await userModel.findOne({email: username})
            if(user){
                console.log('User alredy exists')
                return done(null,false)
            }
            const newUser= {
                first_name,
                last_name,
                email,
                age,
                rol,
                password: createHash(password)
            }
            const result = await userModel.create(newUser)
            return done(null, result)
        } catch (error) {
            return done('Error to obtain the user', error)
        }}))
        passport.use(new googleStrategy({
            clientID: CLIENT_ID,
            clientSecret:SECRET_CLIENT,
            callbackURL: "http://localhost:5173/api/session/product"
          },
          async (accessToken, refreshToken, profile, cb) =>{
            console.log({profile})
            const user = await userModel.findOne({googleId: profile.id})
            try {
               if (!user){
                const newUser = {
                    first_name: profile._json.name.split(' ')[0],
                    last_name: profile._json.name.split(' ')[1],
                    email: profile._json.email,
                    rol: 'usuario',
                    password: 'GoogleGenerated'
                }
                const result = await userModel.create(newUser);   
                return (result)
            }
         
        }catch (error) {
                return cb(err, user);
            }
            /*
            userModel.findOrCreate({  },{username: profile.displayName}, function (err, user) {
              
            });*/
          
          } 
        )) ;
       
      
    passport.use('login', new LocalStrategy(
        {usernameField:'email'},
        async(username,password,done)=>{
            try {
                const user = await userModel.findOne({email:username})
                if(!user){
                    console.log ('User dont exists')
                    return done(null,false)
                }
                if(!isValidPassword(user,password)){
                    return done(null, false)
                }
                return done(null,user)
            } catch (error) {
                return done(error)
            }
        }))



    passport.serializeUser((user,done)=>{
        done(null, user._id);
    })
    passport.deserializeUser(async(id,done)=>{
        const user = await userModel.findOne({_id: id});
        done(null,user)
    })
}

/*
passport.serializeUser(function(user, cb) {
  process.nextTick(function() {
    cb(null, { id: user.id, username: user.username, name: user.displayName });
  });
});

passport.deserializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, user);
  });
});
*/
export default initializePassport
