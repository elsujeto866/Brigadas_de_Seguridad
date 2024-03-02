import express from 'express'
import morgan from 'morgan'
import adminRoutes from './routes/admin.routes.js'
import cookieParser from 'cookie-parser'
import brigadistaRoutes from './routes/brigadista.routes.js'

const app = express()

//Librería que nos muestra por consola las peticiones que se hacen al servidor
app.use(morgan('dev'))
//Permite que el servidor entienda los datos en formato json
app.use(express.json())
//Permite que el servidor covierta una cookien en json
app.use(cookieParser())

//Rutas relacionadas con el admin
app.use("/api",adminRoutes)

//Rutas relacionadas con el brigadista
app.use("/api/brigadista",brigadistaRoutes)


export default app