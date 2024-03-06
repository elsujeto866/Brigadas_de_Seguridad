import React from "react";
import { View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import RegistroBrigadista from "./Components/RegistroBrigadista.jsx";
import LoginBrigadista from "./Components/LoginBrigadista.jsx";
import RegistroGrupos from "./Components/RegistroGrupos.jsx";
import SeleccionGrupo from "./Components/SeleccionGrupo.jsx";

const App = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="LoginBrigadista"
          component={LoginBrigadista}
          options={{ title: "Inicio de Sesion" }}
        />
        <Stack.Screen
          name="RegistroBrigadista"
          component={RegistroBrigadista}
          options={{ title: "Registro de Usuario" }}
        />

        <Stack.Screen
          name="RegistroGrupos"
          component={RegistroGrupos}
          options={{ title: "Registro" }}
        />
        <Stack.Screen
          name="SeleccionGrupo"
          component={SeleccionGrupo}
          options={{ title: "Seleccion" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
