import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { auth } from '../services/firebase';
import { signOut } from '@react-native-firebase/auth';

export default function PerfilScreen({ navigation }) {
  const user = auth().currentUser;

  const handleLogout = async () => {
    try {
      await signOut(auth());
      navigation.replace('Login');
    } catch (error) {
      alert('Error al cerrar sesión');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil de usuario</Text>
      <Text>Email: {user?.email}</Text>
      <Text>UID: {user?.uid}</Text>
      <Button title="Cerrar Sesión" onPress={handleLogout} color="#d32f2f" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});