import React, { useEffect, useState } from 'react';
import { View, Button, StyleSheet, Text, TextInput, Alert } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithCredential,
  signInWithEmailAndPassword
} from 'firebase/auth';

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyB7Mh_0UlMdfVQzDdBuXTmuUU0YTRIbz5Q",
  authDomain: "gotribu-a6d05.firebaseapp.com",
  projectId: "gotribu-a6d05",
  storageBucket: "gotribu-a6d05.appspot.com",
  messagingSenderId: "727634146490",
  appId: "1:727634146490:web:bf86d28914490b843f7e83",
  measurementId: "G-Y2WF2WWMXW"
};

// Inicializar Firebase
initializeApp(firebaseConfig);
WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: '727634146490-dq69c3cvo1ao3shj44fldqjm3f40t69m.apps.googleusercontent.com',
    expoClientId: '727634146490-qig6daggk5duf3mkghtjha4qi2nrlkm2.apps.googleusercontent.com',
    redirectUri: 'https://auth.expo.io/@alicia_mart/GoTribu',
    scopes: ['profile', 'email'],
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token, access_token } = response.authentication;
      const auth = getAuth();
      const credential = GoogleAuthProvider.credential(id_token, access_token);

      signInWithCredential(auth, credential)
        .then(userCredential => {
          console.log('Usuario autenticado con Google:', userCredential.user);
          navigation.replace('Home');
        })
        .catch(error => {
          Alert.alert('Error autenticando con Google', error.message);
        });
    }
  }, [response]);

  const handleEmailLogin = () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        console.log('Usuario autenticado con email:', userCredential.user);
        navigation.replace('Home');
      })
      .catch(error => {
        Alert.alert('Error en inicio de sesión con correo', error.message);
      });
  };

  return (
    <View style={styles.container}>
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
      <Button title="Iniciar sesión con correo" onPress={handleEmailLogin} />

      <View style={{ height: 20 }} />

      <Button
        title="Iniciar sesión con Google"
        disabled={!request}
        onPress={() => promptAsync()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  }
});
