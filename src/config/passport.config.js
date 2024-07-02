import passport from "passport";
import local from "passport-local"
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { userModel } from "../models/user.model.js";
import { createHash, isValidPassword} from "../utils/bcrypt.js";
import { Command } from "commander";
import { getVariables } from "./config.js";
import findOrCreate from "mongoose-findorcreate";

const LocalStrategy = local.Strategy;


const program = new Command()
program.option('--mode <mode>', 'Modo de trabajo', 'development')
const options = program.parse()
const{CLIENT_ID,SECRET_CLIENT,CLIENT_URL} = getVariables(options)



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
        passport.use(new GoogleStrategy({
          clientID:"417028028525-sjc8fun8rk5tu1qhrhv0itrq8ib7th4b.apps.googleusercontent.com",
            clientSecret:"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",
            callbackURL:"http://localhost:8080/api/session/googlecallback"
        },
        async (accessToken, refreshToken, profile, done) => {
          try {
           /* let email = '';
      
            // Verifica si el perfil tiene la propiedad 'emails' y si tiene al menos un email
            if (profile.emails && profile.emails.length > 0) {
              email = profile.emails[0].value;
            } else {
              // Maneja el caso en que el perfil no tiene email (esto es un ejemplo, ajusta según tu lógica)
              throw new Error('El perfil de Google no contiene un correo electrónico válido.');
            }
      */
            // Continúa con tu lógica de autenticación
            let user = await userModel.findOne({ googleId: profile.id });
      
            if (user) {
              return done(null, user);
            } else {
              user = new userModel({
                googleId: profile.id,
                first_name: profile.displayName,
                email:profile.emails  //No guarda el mail 
              });
              const result = await userModel.create(user);
              
              console.log(result)
              return done(null, user);
            }
          } catch (error) {
            return done(error, null);
          }
        }
      
       /* async (accessToken, refreshToken, profile, done) => {
          try {
            // Busca si el usuario ya existe en la base de datos
            let user = await userModel.findOne({ googleId: profile.id });
            let email = ''
              console.log(profile)
            if (user) {
              // Si el usuario existe, pasa al siguiente middleware con el usuario encontrado
              return done(null, user);
           
            }   if(profile.emails && profile.emails.length > 0){
              
              email = profile.emails[0].value 
              console.log(email)
              // Si el usuario no existe, crea uno nuevo en la base de datos
              user = new userModel({
                googleId: profile.id,
                 first_name: profile._json.given_name,
                 last_name: profile._json.family_name,
                 email: email
                // Puedes añadir más campos según la información que desees almacenar del perfil de Google
              });
              
              // Guarda el nuevo usuario en la base de datos
              await user.save();
              return done(null, user);
            }
          } catch (error) {
            return done(error, null);
          }
        }
        /*function(accessToken, refreshToken, profile, cb) {
          userModel.findOrCreate({ googleId: profile.id },{first_name: profile.givenName }, function (err, user) {
            return cb(err, user);
          });
        }*/
      ));
      
    
        passport.serializeUser((user, done) => {
          done(null, user._id);
      });
  
      passport.deserializeUser(async (id, done) => {
          const user = await userModel.findOne({_id: id});
          done(null, user);
      });
  }
export default initializePassport
