import  {Router}  from "express";
import { createUser, deleteUser, getUserById, getUsers, loginUser, logout} from "../controller/session.controller.js";
import  passport  from "passport";
import { checkUser } from "../middleware/auth.js";

const sessionRoutes = Router()

sessionRoutes.post(`/register`, checkUser,passport.authenticate('register',{failureRedirect: '/failregister'}),createUser)
sessionRoutes.post('/login', checkUser,passport.authenticate('login',{failureRedirect:'/faillogin'}), loginUser)
sessionRoutes.post('/logout', logout)
sessionRoutes.get(`/`, checkUser, getUsers )
sessionRoutes.get('/:uId', getUserById)
sessionRoutes.delete('/:uId', deleteUser)


export default sessionRoutes; 