import express from "express" 
import mongoose from "mongoose"
import sessionRoutes from "./routes/session.routes.js"
import corss from "cors"
import cartRoutes from "./routes/cart.routes.js"
import productRoutes from "./routes/product.routes.js"
import session from "express-session"
import MongoStore from "connect-mongo"
import initializePassport from "./config/passport.config.js"
import passport from "passport"


const cors = corss()
const app = express() 
const PORT = 8080

app.use(session({
    secret :'desarrollo',
    store : MongoStore.create({
        mongoUrl: `mongodb+srv://fabelinho5:159Chelseafc@coder.h2ztgkp.mongodb.net/ecommerce-backend` 
    }),
    resave : true,
    saveUninitialized: true
}))
app.use(corss({
    origin: "http://localhost:5173"
}))
initializePassport()
app.use(passport.initialize())
app.use(passport.session())

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(`public`))

mongoose.connect(`mongodb+srv://fabelinho5:159Chelseafc@coder.h2ztgkp.mongodb.net/ecommerce-backend`)

app.use(`/api/user`,sessionRoutes)
app.use('/api/product', productRoutes)
app.use('/api/cart', cartRoutes)


app.listen(PORT,()=>{
    console.log(`Listening on ${PORT}`)
})
