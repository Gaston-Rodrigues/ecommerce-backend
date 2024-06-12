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
  req.session.user= {
  first_name : req.user.first_name,
  last_name: req.user.last_name,
  age: req.user.age,
  email: req.user.email,
  role: req.user.role
  }
  res.send({message: "Bienvenido"})
}

export const loginUser= async(req,res)=>{
    if(!req.user){
        return res.status(400).send({message: "Error in credentials"})
    }   
    req.session.user= {
        first_name : req.user.first_name,
        last_name: req.user.last_name,
        age: req.user.age,
        email: req.user.email,
        role: req.user.role
        }
        res.redirect('/products')
}

export const logout= async(req,res)=>{
    try {
        req.session.destroy((err)=>{
            if(err){
                return res.status(500).json({message: "Fallo al realizar el logout"})
            }
            res.send({redirect: '/login'})
        })
    } catch (error) {
        res.status(400).send({error})
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