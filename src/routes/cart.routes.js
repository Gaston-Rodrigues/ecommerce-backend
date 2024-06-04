import { Router } from "express";
import { addCart, getCartById, getCart } from "../controller/cart.controller.js";

const cartRoutes= Router()

cartRoutes.get('/', getCart)
cartRoutes.get('/:cId', getCartById)
cartRoutes.post('/',addCart) 





export default cartRoutes;