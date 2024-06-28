import { User } from "../Dao/userMananger.js";
import axios from 'axios';

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
        res.redirect('/product')
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

export const getGoogle = async(req,res)=>{
   req.session.user = req.user
   res.redirect('/product') //endpoint principal

}

export const handleGoogleLogin = async (req, res) => {
    const { code } = req.body;
    const clientId = "417028028525-6cp62mf7v4odj5ek46c3tih1q5acf8e6.apps.googleusercontent.com"; 
    const clientSecret = "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"; 
    const redirectUri = 'http://localhost:5173/api/session/product'; 

    try {
        const tokenResponse = await axios.post('https://oauth2.googleapis.com/token', {
            code,
            client_id: clientId,
            client_secret: clientSecret,
            redirect_uri: redirectUri,
            grant_type: 'authorization_code',
        });

        const { access_token } = tokenResponse.data;

        const userInfoResponse = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${access_token}`);
        const userData = userInfoResponse.data;

        let user = await userMongo.findOrCreateUser(userData); 

        req.session.user = {
            first_name: user.first_name,
            last_name: user.last_name,
            age: user.age,
            email: user.email,
            role: user.role,
        };

        res.json({
            token: access_token,
            user: user,
            rol: user.role,
        });
    } catch (error) {
        res.status(500).json({ error: 'Error al intercambiar el código de autorización por un token de acceso.' });
    }
};
                                                                                                                                                                                                                                                                            