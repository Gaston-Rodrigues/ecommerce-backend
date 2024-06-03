import  {Router}  from "express";
import { createUser, deleteUser, getUserById, getUsers} from "../controller/user.controller.js";

const userRoutes = Router()


userRoutes.get(`/`, getUsers )
userRoutes.post(`/register`,createUser)
userRoutes.get('/:uId', getUserById)
userRoutes.delete('/:uId', deleteUser)


export default userRoutes; 