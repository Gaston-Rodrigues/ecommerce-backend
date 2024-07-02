import { Router } from "express";
import { User } from "../Dao/userMananger.js";

const viewRoutes = Router()

const userDao = new User()

viewRoutes.get('/login', (req,res)=>{
  res.render('login')
})

viewRoutes.get('/register', (req,res)=>{
  res.render('register')
})

viewRoutes.get('/home', (req,res)=>{
 res.render('home')
})


export default viewRoutes;