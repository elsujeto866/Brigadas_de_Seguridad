import React from "react";
import { View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import RegistroBrigadista from "./Components/RegistroBrigadista.jsx";
import LoginBrigadista from "./Components/LoginBrigadista.jsx";

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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
