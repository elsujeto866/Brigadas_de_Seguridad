import Admin from "../models/admin.model.js";
export const register = async (req, res) => {
    const {email, password, name} = req.body;

    try {
        const newAdmin = new Admin({
            email,
            password,
            name,
        });
    
        const adminSaved = await newAdmin.save()
        res.send(adminSaved);
        res.send("Administrador registrado exitosamente");
    } catch (error) {
        console.log(error);
    }
    
};
export const login = (req, res) => res.send("login");