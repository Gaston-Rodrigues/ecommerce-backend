import { Cart } from "../Dao/cartManager.js";

const cartMongo = new Cart()



export const getCart = async (req,res)=>{
try {
    const result = await  cartMongo.getCart()
    if(!result){
        return {message: "Cart not found"}
    }
     res.send(result)
} catch (error) {
    res.status(400).send(error)
}
}

export const getCartById = async(req,res)=>{
try {
    const {cId} = req.params
    const find = await cartMongo.getCartById({_id: cId })
    if(!find){
        return {message : "Cart dont exist"}
    }
    res.send(find)
} catch (error) {
      res.status(400).send(error)
}
}

export const addCart = async(req,res)=>{
    try {
        const create = req.body
        const newCart = await cartMongo.addCart(create)
        return res.send({message: " cart create"})
    } catch (error) {
        res.status(400).send(error)
    }
}
