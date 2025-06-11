import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import CrearViajeScreen from '../screens/CrearViajeScreen';
import PerfilScreen from '../screens/PerfilScreen';

const Tab = createBottomTabNavigator();

export default function BottomNav() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Inicio' }} />
      <Tab.Screen name="NuevoViaje" component={CrearViajeScreen} options={{ title: 'Nuevo Viaje' }} />
      <Tab.Screen name="Perfil" component={PerfilScreen} options={{ title: 'Perfil' }} />
    </Tab.Navigator>
  );
}