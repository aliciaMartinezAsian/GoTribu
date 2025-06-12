
import React, { useState, useContext } from 'react';
import {
  View,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image
} from 'react-native';

import { AuthContext } from '../AuthContext';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { signIn, signUp } = useContext(AuthContext);

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Correo y contraseña son obligatorios');
      return;
    }
    signIn(email, password)
      .then(() => navigation.replace('Main'))
      .catch((error) => Alert.alert('Error', error.message));
  };

  const handleRegister = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Correo y contraseña son obligatorios');
      return;
    }
    signUp(email, password)
      .then(() => navigation.replace('Main'))
      .catch((error) => Alert.alert('Error', error.message));
  };

  return (
    <View style={styles.container}>
      
      <Image source={require('./logo.png')} style={styles.logo} />

      
      <Text style={styles.appName}>GoTribu</Text>

      
      <TextInput
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
      />

      <TextInput
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      
      <TouchableOpacity style={styles.buttonContainer} onPress={handleLogin}>
        <Text style={styles.buttonText}>Iniciar Sesión</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.buttonContainer, styles.registerButton]} onPress={handleRegister}>
        <Text style={styles.buttonText}>Crear Cuenta</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 30,
    backgroundColor: '#fff',
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: 'center',
    marginBottom: 20,
  },
  appName: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fa904d',
    marginBottom: 30,
  },
  input: {
    height: 50,
    borderColor: '#fa904d',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  buttonContainer: {
    paddingVertical: 15,
    borderRadius: 8,
    backgroundColor: '#fa904d',
    alignItems: 'center',
    marginVertical: 10,
  },
  registerButton: {
    backgroundColor: '#4CAF50',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});