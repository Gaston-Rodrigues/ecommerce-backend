import mongoose from "mongoose";

const userColletion = "Users"

const userSchema = mongoose.Schema({
    first_name : {
        type: String,
        require: true
    },
    last_name: {
        type: String,
        require: true
    },
    age: {
        type: Number,
        require: true
    },
    email: {
        type : String,
        require: true
    },
    password: {
        type: String,
        require: true,
        unique: true
    }
})


export const userModel = mongoose.model(userColletion,userSchema)