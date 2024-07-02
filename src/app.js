import express from "express" 
import mongoose from "mongoose"
import sessionRoutes from "./routes/session.routes.js"
import cors from "cors"
import cartRoutes from "./routes/cart.routes.js"
import productRoutes from "./routes/product.routes.js"
import session from "express-session"
import MongoStore from "connect-mongo"
import initializePassport from "./config/passport.config.js"
import passport from "passport"
import { Command } from "commander"
import { getVariables } from "./config/config.js"
import  handlebars  from "express-handlebars"
import viewRoutes from "./routes/views.routes.js"


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
app.use(cors({
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,DELETE",
    credentials: true
}))

initializePassport()
app.use(passport.initialize())
app.use(passport.session())


app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(`public`))

const hbs = handlebars.create({
    runtimeOptions: {
        allowProtoPropertiesByDefault: true
    }

})

app.engine('handlebars', hbs.engine)
app.set('views', 'src/views')  
app.set('view engine', 'handlebars')


mongoose.connect(MONGO_URL)

app.use(`/api/session`,sessionRoutes)
app.use('/api/product', productRoutes)
app.use('/api/cart', cartRoutes)
app.use('/', viewRoutes)

app.listen(PORT,()=>{
    console.log(`Listening on ${PORT}`)
})
