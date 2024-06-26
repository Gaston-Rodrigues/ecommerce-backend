
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
            // Intenta encontrar el usuario por su correo electrónico
            let user = await userModel.findOne({ email: userData.email });

            // Si no se encuentra el usuario, créalo
            if (!user) {
                user = new userModel({
                    first_name: userData.given_name,
                    last_name: userData.family_name,
                    email: userData.email,
                    // Puedes agregar otros campos que sean relevantes para tu aplicación
                });

                // Guarda el nuevo usuario en la base de datos
                await user.save();
            }

            // Devuelve el usuario encontrado o creado
            return user;
        } catch (error) {
            return { message: "Error finding or creating user", error };
        }
    }
}
    
