import express from "express" 
import mongoose from "mongoose"
import userRoutes from "./routes/user.routes.js"
import corss from "cors"
import cartRoutes from "./routes/cart.routes.js"
import productRoutes from "./routes/product.routes.js"


const cors = corss()
const app = express() 
const PORT = 8080

app.use(corss({
    origin: "http://localhost:5173"
}))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(`public`))

mongoose.connect(`mongodb+srv://fabelinho5:159Chelseafc@coder.h2ztgkp.mongodb.net/ecommerce-backend`)

app.use(`/api/user`,userRoutes)
app.use('/api/product', productRoutes)
app.use('/api/cart', cartRoutes)


app.listen(PORT,()=>{
    console.log(`Listening on ${PORT}`)
})
