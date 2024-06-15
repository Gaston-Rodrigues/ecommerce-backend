import { productModel } from "../models/product.model.js";


export class Product{
    
    async createProduct(product){
        try {
            const result  = await productModel.create(product)
            return result
        } catch (error) {
            return {message: "Product dont create"}
        }
        
    }
    
    async getProduct(){
        try {
            const allProduct = await productModel.find()
            return allProduct
        } catch (error) {
            return {message: "Product dont found"}
        }
    }
    async getProductById(pId){
     try {
        const find = await productModel.findOne({_id:pId})
        return find
     } catch (error) {
        return{message:"Product dont found"}
     }
    }
    
    async deleteProduct(pId){
    try {
        const deleted = await productModel.deleteOne({_id:pId})
        return deleted

    } catch (error) {
        return {message: "Product didnt delete", error}
    }
    }

   async updateProduct(pId, product){
    try {
            const result = await productModel.findOneAndUpdate({_id: pId}, product)
             return {message: "Product updated", result}
    } catch (error) {
            return{message: "Product didnt update"}
    } 
   }
}



