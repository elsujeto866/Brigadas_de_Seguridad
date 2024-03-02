import express from 'express'
import morgan from 'morgan'

const app = express()

//Librerìa que nos muestra por consola las peticiones que se hacen al servidor
app.use(morgan('dev'))

export default app