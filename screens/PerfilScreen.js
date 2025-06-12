
import React, { useContext } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

import { AuthContext } from '../AuthContext';

export default function PerfilScreen({ navigation }) {
  const { user, signOut } = useContext(AuthContext);

  const handleSignOut = () => {
    signOut();
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido/a</Text>
      <Text style={styles.userInfo}>Correo: {user?.email}</Text>

      <TouchableOpacity style={styles.logoutButton} onPress={handleSignOut}>
        <Text style={styles.logoutText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  userInfo: {
    fontSize: 16,
    marginBottom: 10,
    color: '#555',
  },
  logoutButton: {
    backgroundColor: '#fa904d',
    padding: 15,
    borderRadius: 8,
    marginTop: 30,
    width: '80%',
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});