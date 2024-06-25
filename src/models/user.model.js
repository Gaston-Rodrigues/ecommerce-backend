import mongoose from "mongoose";
import findOrCreate from "mongoose-findorcreate"
import passportLocalMongoose from "passport-local-mongoose"

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
    googleId: String,
    secret:String,
    
    cart : {
        type: mongoose.Schema.ObjectId,
        ref: 'carts'
}
})

userSchema.plugin(passportLocalMongoose)
userSchema.plugin(findOrCreate)

export const userModel = mongoose.model(userColletion,userSchema)