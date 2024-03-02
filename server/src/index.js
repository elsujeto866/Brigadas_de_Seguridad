import app from "./app.js";
import connectDB from "./db.js";

const port = 3000;
//Conexión a la base de datos
connectDB();
//Iniciando el servidor
app.listen(port, () => {
    console.log('Server is running on port', port)
  })