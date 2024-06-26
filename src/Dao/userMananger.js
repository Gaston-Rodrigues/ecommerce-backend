
import { userModel } from "../models/user.model.js";

export class User{
    async getUser(){
        try {
            const result = await userModel.find()
            return {result}

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
            return {message: "User created"}
        } catch (error) {
            return {message: "User dont create", error}
        }
    } 

    async deleteUserById(uId){
         try {
            const deleted = await userModel.deleteOne({_id: uId})
            return deleted
         } catch (error) {
            return {message: "User dont deleted", error}
         }
    }

    async findOrCreateUser(userData) {
        try {
            let user = await userModel.findOne({ email: userData.email });
            if (!user) {
                user = new userModel({
                    first_name: userData.given_name,
                    last_name: userData.family_name,
                    email: userData.email,
                });
                await user.save();
            }
            return user;
        } catch (error) {
            return { message: "Error finding or creating user", error };
        }
    }
}
    
