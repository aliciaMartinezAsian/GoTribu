// components/BottomNav.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import CrearViajeScreen from '../screens/CrearViajeScreen';
import PerfilScreen from '../screens/PerfilScreen';

// Importa el componente de iconos
import { Ionicons } from '@expo/vector-icons'; // Puedes usar otras fuentes como FontAwesome, MaterialIcons, etc.

const Tab = createBottomTabNavigator();

export default function BottomNav() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Inicio') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'NuevoViaje') {
            iconName = focused ? 'airplane' : 'airplane-outline';
          } else if (route.name === 'Perfil') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#DB4437', // Color cuando está activo
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Inicio" component={HomeScreen} />
      <Tab.Screen name="NuevoViaje" component={CrearViajeScreen} options={{ title: 'Nuevo Viaje' }} />
      <Tab.Screen name="Perfil" component={PerfilScreen} />
    </Tab.Navigator>
  );
}