import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function DetalleViajeScreen({ route, navigation }) {
  const { trip } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Título:</Text>
      <Text>{trip.titulo}</Text>

      <Text style={styles.label}>Fechas:</Text>
      <Text>{trip.fechaIda} - {trip.fechaVuelta}</Text>

      <Text style={styles.label}>Sitio:</Text>
      <Text>{trip.sitio}</Text>

      <Text style={styles.label}>Presupuesto:</Text>
      <Text>{trip.presupuesto}</Text>

      <Button title="Volver" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  label: {
    fontWeight: 'bold',
    marginTop: 15,
  },
});