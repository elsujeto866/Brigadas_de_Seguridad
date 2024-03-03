import express from 'express'
import morgan from 'morgan'
import adminRoutes from './routes/admin.routes.js'
import cookieParser from 'cookie-parser'
import brigadistaRoutes from './routes/brigadista.routes.js'
import scheduleRoutes from './routes/schedule.routes.js'
import cors from 'cors'
import groupRoutes from './routes/group.routes.js';

const app = express()

app.use(cors())
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

//Rutas relacionadas con los horarios
app.use("/api",scheduleRoutes)

// Rutas relacionadas con los grupos
app.use("/api/group", groupRoutes); // Agrega las rutas del grupo


export default app