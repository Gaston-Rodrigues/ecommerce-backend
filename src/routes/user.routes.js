import  Router  from "express";
import { getUsers} from "../controller/user.controller.js";

const userRoutes = Router()


userRoutes.get(`/`, getUsers )



export default userRoutes;