import mongoose from "mongoose";

const productColletion = "products"

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    categoria:{
        type : String,
        required: true,
        enum : ['hombre', 'mujer']
    },
    price: {
      type : Number,
      required: true
    },
    stock : {
     type: Number,
     required: true,
     default : 0
    },
    code: {
        type: String,
        unique: true,
        required: true
    }
})

export const productModel = mongoose.model(productColletion,productSchema)