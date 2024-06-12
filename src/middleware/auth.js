import { userModel } from "../models/user.model.js"
import { isValidPassword } from "../utils/bcrypt.js"

export const checkUser = (req,res,next)=>{
    if(!req.session.user){
        res.redirect('/login')
    }
    next()
}