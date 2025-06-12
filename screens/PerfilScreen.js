
import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { AuthContext } from '../AuthContext';

export default function PerfilScreen({ navigation }) {
  const { user, signOut } = useContext(AuthContext);

  const handleSignOut = () => {
    signOut();
    navigation.navigate('Login'); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Usuario:</Text>
      <Text>{user?.email}</Text>

      <Button title="Cerrar Sesión" onPress={handleSignOut} color="#d32f2f" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
});