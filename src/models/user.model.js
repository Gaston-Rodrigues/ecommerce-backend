import mongoose from "mongoose";

const userColletion = "Users"

const userSchema = mongoose.Schema({
    first_name : {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    email: {
        type : String,
        required: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    cart : {
        type: mongoose.Schema.ObjectId,
        ref: 'carts'
}
})


export const userModel = mongoose.model(userColletion,userSchema)