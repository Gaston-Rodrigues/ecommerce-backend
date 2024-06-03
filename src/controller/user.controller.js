import { User } from "../Dao/userMananger.js";


const userMongo = new User()


export const getUsers = async(req,res)=>{
    try {
         const result = await userMongo.getUser()
        if(!result){
         return res.send({message: "users dont found"}) 
        }
         res.send(result)
    } catch (error) {
        res.status(400).send(error)
    }
 
}

export const getUserById = async(req,res)=>{
    try {
        const {uId} = req.params
        const filter = await userMongo.getUserById({_id: uId})
        if(!filter){
          return res.send({message: "user dont exits"}) 
        }
        res.send(filter)
    } catch (error) {
        res.status(400).send(error) 
    }
}

export const createUser = async(req,res)=>{
  try {  
     const user= req.body
    const result = await userMongo.createUser(user)
    if(result){
         return res.send({message: "user created"}) 
    }
   
  } catch (error) {
    res.status(400).send(error)
   
  }
}



export const deleteUser = async(req,res)=>{

   try {
          const {uId} = req.params 
        const result = await userMongo.deleteUserById({_id: uId})
        if(result){
      
            return res.send({message: "User deleted"})
        }
        else{
            return res.send({message: "User dont exits"})
        }
      
    } catch (error) {
        res.status(400).send(error)
        
    }
}