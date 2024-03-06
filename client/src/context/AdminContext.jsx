import { createContext, useState, useContext } from "react";
import { loginRequest } from "../api/admin.js";

export const AdminContext = createContext();
//Hook para acceder al contexto
export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
};

export const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState(null);

  const signin = async (admin) => {
    try {
      const res = await loginRequest(admin);
      
      setAdmin(res.data);
      setIsAuthenticated(true);
    } catch(error) {
      console.log(error.response);
      setErrors(error.response.data);
    }
  };
  return (
    <AdminContext.Provider value={{ signin,isAuthenticated, errors }}>
      {children}
    </AdminContext.Provider>
  ); //Estos son los datos que se exportan
};
