import mongoose from "mongoose";
import findOrCreate from "mongoose-findorcreate"
import passportLocalMongoose from "passport-local-mongoose"


const userColletion = "Users"


const userSchema =   mongoose.Schema({
    first_name : {
        type: String,
        
    },
    last_name: {
        type: String,
       
    },
    age: {
        type: Number,
      
    },
    email: {
        type : String,
      
    },
    password: {
        type: String,
        
        unique: true
    },
    googleId: String,
    secret:String,
    
})

userSchema.plugin(passportLocalMongoose)
userSchema.plugin(findOrCreate)

export const userModel = mongoose.model(userColletion,userSchema)