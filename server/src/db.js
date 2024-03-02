import mongoose from "mongoose";

export  const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/BrigadasDeSeguridadDB", {
      useNewUrlParser: true, //Esta opción le dice a Mongoose que use el nuevo analizador de cadena de conexión de MongoDB.
      useUnifiedTopology: true, //Esta opción le dice a Mongoose que use el nuevo motor de administración de conexiones de MongoDB
    });
    console.log("DB is connected");
  } catch (error) {
    console.log("Error: ", error);
  }
};

export default connectDB;
