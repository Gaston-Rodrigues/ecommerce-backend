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
import { Command } from "commander"
import { getVariables } from "./config/config.js"

const cors = corss()
const app = express() 


const program = new Command()
program.option('--mode <mode>', 'Modo de trabajo', 'production')
const options = program.parse()
const{PORT, MONGO_URL} = getVariables(options)

app.use(session({
    secret :'desarrollo',
    store : MongoStore.create({
        mongoUrl: MONGO_URL 
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

mongoose.connect(MONGO_URL)

app.use(`/api/session`,sessionRoutes)
app.use('/api/product', productRoutes)
app.use('/api/cart', cartRoutes)


app.listen(PORT,()=>{
    console.log(`Listening on ${PORT}`)
})
