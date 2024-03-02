import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

export const authRequired = (req, res, next) => {
    const {token} = req.cookies;
    //si no hay token
    if (!token) return res.status(401).json({message: "No token, authorization denied"});

jwt.verify(token, TOKEN_SECRET, (err, user) => {
    //si el token no es valido
    if (err) return res.status(401).json({message: "Token is not valid"});
    //guardar el usuario en el objeto req
    req.user = user;
    
    next();
})
   
}