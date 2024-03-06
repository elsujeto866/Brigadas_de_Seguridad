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
  const [scheduleDetails, setScheduleDetails] = useState();
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
          groupResponse.data.schedule &&
          groupResponse.data.schedule.length > 0
        ) {
          const scheduleResponse = await axios.get(
            `http://localhost:8000/api/horario/${groupResponse.data.schedule[0]}`
          );
          setScheduleDetails(scheduleResponse.data);
        }

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
    if (selectedBrigadista) {
      console.log(
        "Seleccionando brigadista como coordinador: ",
        selectedBrigadista
      );

      const brigadista = selectedBrigadista; // Almacenar una copia del objeto selectedBrigadista

      const hasCoordinator = integrantes.some(
        (integrante) => integrante.rol === "coordinador"
      );

      // Si no hay un coordinador existente, asigna al brigadista seleccionado como coordinador
      if (!hasCoordinator) {
        const updatedIntegrantes = integrantes.map((integrante) => {
          if (integrante.id === brigadista.id) {
            return {
              ...integrante,
              rol: "coordinador",
            };
          }
          return integrante;
        });
        setIntegrantes(updatedIntegrantes);
        setSelectedBrigadista(null); // Reiniciar el estado del brigadista seleccionado

        try {
          // Llamada a la API para actualizar el rol en la base de datos
          const response = await axios.put(
            `http://localhost:8000/api/brigadista/${brigadista.id}`,
            { rol: "coordinador" }
          );
          console.log(response.data.message);
        } catch (error) {
          console.error(
            "Error actualizando rol del brigadista seleccionado:",
            error
          );
        }
      } else {
        // Si ya hay un coordinador existente, no necesitas cambiar su rol a "brigadista"
        // Solo asigna al brigadista seleccionado como coordinador
        const updatedIntegrantes = integrantes.map((integrante) => {
          if (integrante.rol === "coordinador") {
            return {
              ...integrante,
              rol: "brigadista",
            };
          } else if (integrante.id === brigadista.id) {
            return {
              ...integrante,
              rol: "coordinador",
            };
          }
          return integrante;
        });
        setIntegrantes(updatedIntegrantes);
        setSelectedBrigadista(null); // Reiniciar el estado del brigadista seleccionado

        try {
          // Llamada a la API para actualizar el rol en la base de datos
          const response = await axios.put(
            `http://localhost:8000/api/brigadista/${brigadista.id}`,
            { rol: "coordinador" }
          );
          console.log(response.data.message);
        } catch (error) {
          console.error(
            "Error actualizando rol del brigadista seleccionado:",
            error
          );
        }
      }
    } else {
      console.error("El brigadista seleccionado es indefinido");
    }
  };

  return (
    <div className="outer-box">
      <Box component="main" className="main-box">
        <Grid container spacing={2} alignItems="center">
          {/* Nombre */}
          <Grid item xs={12} container alignItems="center">
            <Grid item xs={2}>
              <InputLabel htmlFor="filled-basic" className="label">
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
              <InputLabel htmlFor="filled-zone" className="label">
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
              <InputLabel htmlFor="filled-day" className="label">
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
              <InputLabel htmlFor="filled-hour" className="label">
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
                  scheduleDetails
                    ? scheduleDetails.horas
                      ? scheduleDetails.horas
                          .map((hora) => hora.horaInicio + "-" + hora.horaFin)
                          .join(", ")
                      : ""
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
            <BotonGeneral texto="Guardar" />
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
