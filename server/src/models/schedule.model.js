import mongoose from 'mongoose';

 
const horaSchema = new mongoose.Schema({
  horaInicio: {
      type: String,
      required: [ true, "Seleccione una hora de Inicio"]
    },
    horaFin: {
      type: String,
      required: true
    }
});

const scheduleSchema = new mongoose.Schema({
fecha: {
  type: Date,
  required: [ true, "Seleccione una Fecha"]
},
horas: {
  type: [horaSchema],
  required: true
}
});
   
  
  export default mongoose.model('Schedule', scheduleSchema);