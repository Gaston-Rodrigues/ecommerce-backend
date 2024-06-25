import dotenv from "dotenv"

export const getVariables = (options) =>{
    const enviroment = options.opts().mode


dotenv.config({
    path : enviroment === 'production' ? './src/.env.production' : './src/.env.development'
})

return {
    PORT : process.env.PORT,
    CLIENT_ID : process.env.CLIENT_ID,
    SECRET_CLIENT : process.env.SECRET_CLIENT,
    MONGO_URL : process.env.MONGO_URL
}}