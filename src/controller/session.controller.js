import { User } from "../Dao/userMananger.js";


const userMongo = new User()


export const getUsers = async(req,res)=>{
    try {
         const result = await userMongo.getUser()
        if(!result){
         return  res.status(400).send({message: "User dont found"})
        }
         res.send(result)
    } catch (error) {
        res.send(error)
    }
 
}


export const getUserById = async(req,res)=>{
    try {
        const {uId} = req.params
        const filter = await userMongo.getUserById({_id: uId})
        if(!filter){
            return res.status(400).send({message: "User dont exists"})
        }
        res.send(filter)
    } catch (error) {
        res.send(error) 
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
        res.redirect('/api/session/home')
}

export const logout= async(req,res)=>{
    try {
        req.session.destroy((err)=>{
            if(err){
                return res.status(500).json({message: "Fail in logout"})
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
        if( result.deletedCount === 0 ){
           return res.status(400).send({message: "User dont exits"})
        }
        
        res.send({message: "User deleted"})
        
      
    } catch (error) {
        res.status(400).send(error)
        
    }
}


                                                                                                                                                                                                                                                                            