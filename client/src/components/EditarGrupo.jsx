import React, { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import { useParams } from "react-router-dom";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import FilledInput from "@mui/material/FilledInput";
import "./styles/editarGrupo.css";
import BotonGeneral from "./BotonGeneral";
import DataGridUsuario from "./DataGridUsuario";

export default function EditarGrupo() {
  const [grupo, setGrupo] = useState();
  const [scheduleDetails, setScheduleDetails] = useState({});
  const [integrantes, setIntegrantes] = useState([]);
  const { id } = useParams();
  const [selectedBrigadista, setSelectedBrigadista] = useState(null);

  useEffect(() => {
    const fetchGroupData = async () => {
      try {
        const groupResponse = await axios.get(
          `http://localhost:8000/api/group/${id}`
        );
        setGrupo(groupResponse.data);

        if (
          groupResponse.data &&
          groupResponse.data.members &&
          groupResponse.data.members.length > 0
        ) {
          const membersData = [];
          for (const memberId of groupResponse.data.members) {
            const memberResponse = await axios.get(
              `http://localhost:8000/api/brigadista/${memberId}`
            );
            const memberWithId = {
              ...memberResponse.data,
              id: memberId, // Usando el memberId como id único
            };
            membersData.push(memberWithId);
          }
          setIntegrantes(membersData);
          console.log(membersData);
        }
        console.log(groupResponse.data);
        if (
          groupResponse.data &&
          groupResponse.data.schedule &&
          groupResponse.data.schedule.length > 0
        ) {
          const scheduleResponse = await axios.get(
            `http://localhost:8000/api/horarios/${groupResponse.data.date}`
          );
          // Suponiendo que groupResponse.data.schedule contiene el ID que buscas
          const scheduleId = groupResponse.data.schedule;
          let matchingHora = null;

          // Itera sobre el array de horas para encontrar el objeto que coincida con el ID
          for (const hora of scheduleResponse.data.horas) {
            if (String(hora._id) === String(scheduleId)) {
              matchingHora = hora;
              break; // Sal del bucle una vez que encuentres una coincidencia
            }
          }
          // Si encontramos una hora que coincide con el ID, establecemos scheduleDetails
          if (matchingHora) {
            setScheduleDetails(matchingHora);
          } else {
            console.log(
              "No se encontró ninguna hora que coincida con el ID:",
              scheduleId
            );
          }
        }
      } catch (error) {
        console.error("Error fetching group data:", error);
      }
    };
    fetchGroupData();
  }, [id]);

  const handleDelete = () => {
    console.log("Eliminando grupo: ", selectedBrigadista);
    if (
      selectedBrigadista &&
      window.confirm("¿Estás seguro de eliminar este integrante del grupo?")
    ) {
      const updatedIntegrantes = integrantes.filter(
        (integrante) => integrante.id !== selectedBrigadista.id
      );
      setIntegrantes(updatedIntegrantes);
      setSelectedBrigadista(null); // Reiniciar el estado del integrante seleccionado
    }
  };

  const handleSelect = async () => {
    try {
      const response = await axios.put(`http://localhost:8000/api/brigadista/${selectedBrigadista}`);
      const brigadista = response.data;
  
      if (brigadista) {
        const hasCoordinator = integrantes.some(integrante => integrante.rol === "coordinador");
        const newRole = hasCoordinator ? "brigadista" : "coordinador";
  
        const updatedIntegrantes = integrantes.map(integrante => {
          if (integrante.id === brigadista.id) {
            return { ...integrante, rol: newRole };
          }
          if (integrante.rol === "coordinador" && newRole === "coordinador") {
            return { ...integrante, rol: "brigadista" };
          }
          return integrante;
        });
  
        const confirmation = window.confirm(`¿Estás seguro de convertir al brigadista ${brigadista.id} en ${newRole}?`);
        if (confirmation) {
          await axios.put(`http://localhost:8000/api/brigadista/${brigadista._id}`, { rol: newRole });
  
          setIntegrantes(updatedIntegrantes);
          setSelectedBrigadista(null);
  
          console.log(`Rol del brigadista ${brigadista._id} actualizado a ${newRole}`);
        } else {
          console.log("Operación cancelada por el usuario.");
        }
      } else {
        console.error("El brigadista seleccionado no fue encontrado");
      }
    } catch (error) {
      console.error("Error al recuperar o actualizar el brigadista:", error);
    }
  };  

  return (
    <div className="outer-box">
      <Box component="main" className="main-box">
        <Grid container spacing={2} alignItems="center">
          {/* Nombre */}
          <Grid item xs={12} container alignItems="center">
            <Grid item xs={2}>
              <InputLabel htmlFor="filled-basic" style={{ color: "white", fontWeight: "bold", fontSize: "16px" }}>
                Nombre:
              </InputLabel>
            </Grid>
            <Grid item xs={10}>
              <FilledInput
                id="filled-basic"
                variant="filled"
                disabled
                className="filled-input"
                value={grupo ? grupo.name : ""}
                sx={{ width: "70%" }}
              />
            </Grid>
          </Grid>

          {/* Zona */}
          <Grid item xs={12} container alignItems="center">
            <Grid item xs={2}>
              <InputLabel htmlFor="filled-zone" style={{ color: "white", fontWeight: "bold", fontSize: "16px" }}>
                Zona:
              </InputLabel>
            </Grid>
            <Grid item xs={10}>
              <FilledInput
                id="filled-zone"
                variant="filled"
                disabled
                className="filled-input"
                value={grupo ? grupo.zone : ""}
                sx={{ width: "70%" }}
              />
            </Grid>
          </Grid>

          {/* Día */}
          <Grid item xs={12} md={4} container alignItems="center">
            <Grid item xs={6}>
              <InputLabel htmlFor="filled-day" style={{ color: "white", fontWeight: "bold", fontSize: "16px" }}>
                Día: 
              </InputLabel>
            </Grid>
            <Grid item xs={6}>
              <FilledInput
                id="filled-day"
                variant="filled"
                disabled
                className="filled-input"
                value={
                  grupo && grupo.date
                    ? new Date(grupo.date).toLocaleDateString("es-ES", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })
                    : ""
                }
              />
            </Grid>
          </Grid>
          {/* Horario */}
          <Grid item xs={12} md={8} container alignItems="center">
            <Grid item xs={2}>
              <InputLabel htmlFor="filled-hour" style={{ color: "white", fontWeight: "bold", fontSize: "16px" }}>
                Horario:
              </InputLabel>
            </Grid>
            <Grid item xs={6}>
              <FilledInput
                id="filled-hour"
                variant="filled"
                disabled
                className="filled-input"
                value={
                  scheduleDetails &&
                  scheduleDetails.horaInicio &&
                  scheduleDetails.horaFin
                    ? `${scheduleDetails.horaInicio} - ${scheduleDetails.horaFin}`
                    : ""
                }
                sx={{ width: "91%" }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <Box component="main" className="main-box">
        <Grid container spacing={2}>
          {/* DataGridUsuario */}
          <Grid item xs={10} className="data-grid-container">
            <DataGridUsuario
              integrantes={integrantes}
              onRowSelection={(selectedRow) =>
                setSelectedBrigadista(selectedRow)
              }
            />
            {/*<BotonGeneral texto="Guardar" />*/}
          </Grid>
          {/* Botón */}
          <Grid item xs={2}>
            <BotonGeneral texto="Eliminar Integrante" onClick={handleDelete} />
            <p></p>
            <BotonGeneral texto="Seleccionar" onClick={handleSelect} />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
