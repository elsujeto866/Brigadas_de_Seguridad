import express from 'express'
import morgan from 'morgan'
import authRoutes from './routes/auth.routes.js'

const app = express()

//Librería que nos muestra por consola las peticiones que se hacen al servidor
app.use(morgan('dev'))
//Permite que el servidor entienda los datos que se envían desde un formulario
app.use(express.json())

//Rutas relacionadas con la autenticación
app.use("/api",authRoutes)

export default app