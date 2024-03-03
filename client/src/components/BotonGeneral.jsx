import Button from "@mui/material/Button";
import "./styles/botonGeneral.css";

export default function BotonGeneral({texto, onClick }) {
  return(
    <>
        <Button className = "boton-general" variant="contained" onClick={onClick}>{texto}</Button>
    </>
  );
}
