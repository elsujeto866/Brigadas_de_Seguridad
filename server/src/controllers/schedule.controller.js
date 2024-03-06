import Schedule from '../models/schedule.model.js';

// Controlador para crear un nuevo horario
export const crearHorario = (req, res) => {
  // Extraer datos del cuerpo de la solicitud
  const { fecha, horaInicio, horaFin } = req.body;
  // Crear una instancia del modelo Horario con los datos proporcionados
  const nuevoHorario = new Schedule({
    fecha: new Date(fecha),
    horas: [{ horaInicio, horaFin }] // Agregar las horas como un array en la propiedad 'horas'
  });
  // Validar el horario utilizando el método validate de Mongoose
  const errores = nuevoHorario.validateSync();
  // Busca un horario existente para la fecha seleccionada
  Schedule.findOneAndUpdate(
    { fecha: new Date(fecha) },
    { $push: { horas: { horaInicio, horaFin } } },
    { new: true, upsert: true }
  )
  .then(horarioExistente => {
    res.status(200).json(horarioExistente);
  })
  .catch(error => {
    // Manejar errores
    console.error('Error al crear horario:', error);
    res.status(400).json(error);
    res.status(500).json({ mensaje: 'Ocurrió un error al crear el horario' });
  });
};

export const getAllHorarios = (_, response) => {
  Schedule.find({})
  .then(horario => response.json(horario))
  .catch(err => response.json(err))
}

export const getHorario = (request, response) => {
  console.log('Valor de fecha:', request.params);
  Schedule.findOne({ fecha: request.params.id })
    .then(horario => {
      if (horario) {
        response.json(horario); // Envía el horario encontrado como respuesta
      } else {
        response.status(404).json({ mensaje: 'No se encontró el horario' });
      }
    })
    .catch(err => {
      console.error('Error al obtener el horario:', err);
      response.status(500).json({ mensaje: 'Ocurrió un error al obtener el horario' });
    });
}

// Función para obtener una hora por su _id y fecha
export const getHoraPorIdYFecha = (req, res) => {
  const { fecha, horaId } = req.params;

  Schedule.findOne({ fecha })
    .then(horario => {
      if (!horario) {
        return res.status(404).json({ mensaje: 'No se encontró el horario para la fecha especificada' });
      }

      // Buscar la hora por su _id dentro del array de horas del horario encontrado
      const horaEncontrada = horario.horas.find(hora => hora._id.toString() === horaId);
      if (!horaEncontrada) {
        return res.status(404).json({ mensaje: 'No se encontró la hora con el _id especificado' });
      }

      res.status(200).json({ hora: horaEncontrada });
    })
    .catch(error => {
      console.error('Error al obtener la hora por _id y fecha:', error);
      res.status(500).json({ mensaje: 'Ocurrió un error al obtener la hora por _id y fecha' });
    });
};

