import { cartModel } from "../models/cart.model.js";

export class Cart {
    async getCart(){
        try {
            const result = await cartModel.find()
            return result
        } catch (error) {
            return{error}
        }
    }

    async getCartById(cId){
        try {
            const search = await cartModel.findOne({_id: cId})
            return search
        } catch (error) {
            return error
        }
    }

    async addCart(cart){
      try {
        const create = await cartModel.create(cart)
        return create
      } catch (error) {
        return error
      }
    }
}