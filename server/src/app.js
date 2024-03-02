import express from 'express'
import morgan from 'morgan'
import authRoutes from './routes/auth.routes.js'
import cookieParser from 'cookie-parser'

const app = express()

//Librería que nos muestra por consola las peticiones que se hacen al servidor
app.use(morgan('dev'))
//Permite que el servidor entienda los datos en formato json
app.use(express.json())
//Permite que el servidor covierta una cookien en json
app.use(cookieParser())

//Rutas relacionadas con la autenticación
app.use("/api",authRoutes)

export default app