import mongoose from "mongoose";
import { userModel } from "../models/user.model.js";

export class User{
    async getUser(){
        try {
            const result = await userModel.find()
            return result

        } catch (error) {
            return {message: "User dont found", error}
        }

    }
    
    async getUserById(uId){
        try {
             const result = await userModel.findOne({_id:uId})
            return result
        } catch (error) {
            return {message: "user dont exist", error}
        }
         }




    async createUser(user){
        try {
            const create = await userModel.create(user)
            return {message: "User created", create}
        } catch (error) {
            return {message: "User dont create", error}
        }
    }

    async deleteUserById(uId){
         try {
            const deleted = await userModel.deleteOne({_id: uId})
            return {message:"User deleted"}
         } catch (error) {
            return {message: "User dont deleted", error}
         }
    }

}