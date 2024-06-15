import { Product } from "../Dao/productManager.js";

const productMongo = new Product()

export const addProduct = async (req,res)=>{
 try {
    const product= req.body
    if(!product.name || !product.description || !product.category || !product.price || !product.stock || !product.code){
        return {message: "Product Incompleted"}
    }
      const newProduct = await productMongo.createProduct(product)
      return res.status(201).json({message: "Product Added"})
   } catch (error) {
      return error
   }
}

export const getProduct = async(req,res)=>{
   try {
      const findAll = await productMongo.getProduct()
      if(!findAll){
        return {message: "Products dont found"}
      }
      res.send(findAll)
   } catch (error) {
      return error;
   }

}

export const deleteProduct = async (req,res)=>{
 try {
     const {pId}= req.params
     const deleted = await productMongo.deleteProduct({_id: pId})
 if(deleted.deletedCount === 0 ){
      return  res.status(400).send({message: "Product dont exists"})
 }
  res.send({message: "Product deleted"})
} 
  
 catch (error) {
      return {message: "Product didnt delete", error}
  }
  }


