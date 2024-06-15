import { Router } from "express";
import { addProduct, deleteProduct, getProduct } from "../controller/product.controller.js";

const productRoutes= Router();

productRoutes.post("/createProduct", addProduct )
productRoutes.get("/", getProduct)
productRoutes.get("/:pId",)
productRoutes.put("/:pId",)
productRoutes.delete("/:pId", deleteProduct)



export default productRoutes;