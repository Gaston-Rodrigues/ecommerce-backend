import { User } from "../Dao/userMananger.js";


const userMongo = new User()


export const getUsers = async(req,res)=>{
    try {
         const result = await userMongo.getUser()
         res.send(result)
    } catch (error) {
        res.status(400).send(error)
    }
 
}