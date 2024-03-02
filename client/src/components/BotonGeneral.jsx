import Button from "@mui/material/Button";
import "./styles/botonGeneral.css";

export default function BotonGeneral({texto}) {
  return(
    <>
        <Button className = "boton-general" variant="contained">{texto}</Button>
    </>
  );
}
