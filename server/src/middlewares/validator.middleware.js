export const validateSchema = (schema) => (req, res, next) => {
  try {
    //Me valida el cuerpo de la solicitud req.body segun el esquema que especifique en este caso auth.schema.js
    schema.parse(req.body);
    next();
  } catch (error) {
    res.status(400).json({ error: error.errors.map((err) => err.message)});
  }
};
