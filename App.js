
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthProvider, { AuthContext } from './AuthContext'; 
import LoginScreen from './screens/LoginScreen';
import BottomNav from './components/BottomNav';
import DetalleViajeScreen from './screens/DetalleViajeScreen';
import CrearViajeScreen from './screens/CrearViajeScreen'; 
import HomeScreen from './screens/HomeScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Main" component={BottomNav} options={{ headerShown: false }} />
          <Stack.Screen name="DetalleViaje" component={DetalleViajeScreen} options={{ title: 'Detalles del Viaje' }} />
          <Stack.Screen name="CrearViaje" component={CrearViajeScreen} options={{ title: 'Nuevo Viaje' }} />
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Inicio' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}