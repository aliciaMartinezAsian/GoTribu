import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';

import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';

import {
  GoogleAuthProvider,
  signInWithCredential,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from '@react-native-firebase/auth';

import { auth, firestore } from '../services/firebase';
import { doc, setDoc } from '@react-native-firebase/firestore';

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: '727634146490-2n6islcsi9jokiqej013frsq3scmlj2e.apps.googleusercontent.com',
    expoClientId: '727634146490-2t8p8ho2pfqhbvrjrfsq26qq73qtra9h.apps.googleusercontent.com'
  });

  // Manejo de respuesta de Google
  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.authentication;
      const credential = GoogleAuthProvider.credential(id_token);

      signInWithCredential(auth(), credential)
        .then(async (userCredential) => {
          const user = userCredential.user;

          // Guarda datos adicionales si no existen
          const userRef = doc(firestore(), 'users', user.uid);
          const snapshot = await userRef.get();
          if (!snapshot.exists) {
            await userRef.set({
              email: user.email,
              displayName: user.displayName,
              photoURL: user.photoURL,
              createdAt: firestore.FieldValue.serverTimestamp(),
            });
          }

          navigation.replace('Home');
        })
        .catch((error) => {
          Alert.alert('Error', error.message);
        });
    }
  }, [response]);

  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth(), email, password);
      navigation.replace('Home');
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;

      let customMessage = 'Ocurrió un error al iniciar sesión.';

      if (errorCode === 'auth/wrong-password') {
        customMessage = 'Contraseña incorrecta. Por favor, inténtalo de nuevo.';
      } else if (errorCode === 'auth/user-not-found') {
        customMessage = 'No se encontró ninguna cuenta asociada a este correo electrónico.';
      } else if (errorCode === 'auth/invalid-email') {
        customMessage = 'El correo electrónico ingresado no es válido.';
      } else if (errorCode === 'auth/invalid-credential') {
        customMessage = 'Las credenciales proporcionadas son incorrectas o han caducado.';
      }

      Alert.alert('Error al iniciar sesión', customMessage);
    }
  };

  const handleCreateAccount = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth(), email, password);
      const user = userCredential.user;

      // Guarda el usuario en Firestore
      const userRef = doc(firestore(), 'users', user.uid);
      await userRef.set({
        email: user.email,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });

      navigation.replace('Home');
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;

      let customMessage = 'Ocurrió un error al crear la cuenta.';

      if (errorCode === 'auth/email-already-in-use') {
        customMessage = 'Ya existe una cuenta asociada a este correo electrónico.';
      } else if (errorCode === 'auth/invalid-email') {
        customMessage = 'El correo electrónico ingresado no es válido.';
      } else if (errorCode === 'auth/weak-password') {
        customMessage = 'La contraseña debe tener al menos 6 caracteres.';
      }

      Alert.alert('Error al crear cuenta', customMessage);
    }
  };

  return (
    <View style={styles.container}>
      {/* Icono redondo */}
      <Image
        source={require('./logo.png')} // Asegúrate de que sea el nombre correcto
        style={styles.logo}
      />

      <Text style={styles.title}>Bienvenido a GoTribu</Text>

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

      <Button title="Iniciar Sesión" onPress={handleSignIn} />
      <Button title="Crear Cuenta" onPress={handleCreateAccount} color="#4CAF50" />

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#DB4437' }]}
        disabled={!request}
        onPress={() => promptAsync()}
      >
        <Text style={styles.buttonText}>Iniciar sesión con Google</Text>
      </TouchableOpacity>
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
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50, // Hace que sea circular
    alignSelf: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 15,
  },
  button: {
    marginTop: 15,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});