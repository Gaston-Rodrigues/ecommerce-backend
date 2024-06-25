import  {Router}  from "express";
import { createUser, deleteUser, getUserById, getUsers, loginUser, logout,getGoogle} from "../controller/session.controller.js";
import  passport  from "passport";
import { checkUser } from "../middleware/auth.js";

const sessionRoutes = Router()

sessionRoutes.post(`/register`,passport.authenticate('register',{failureRedirect: '/failregister'}),createUser)
sessionRoutes.post('/login',checkUser, passport.authenticate('login',{failureRedirect:'/faillogin'}), loginUser)
sessionRoutes.get('/auth/google', passport.authenticate('google', {scope: ['profile']}), getGoogle) //nombre del boton de autenticacion con google
sessionRoutes.get('/auth/google', passport.authenticate('google',{failureRedirect:'/faillogin'}),getGoogle)
sessionRoutes.post('/logout', logout)
sessionRoutes.get(`/`, getUsers )
sessionRoutes.get('/:uId', getUserById)
sessionRoutes.delete('/:uId', deleteUser)


export default sessionRoutes; 
