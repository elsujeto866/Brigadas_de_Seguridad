import axios from "axios";

const API = "http://localhost:8000/api";

export const loginRequest = (admin) => axios.post(`${API}/login`, admin);