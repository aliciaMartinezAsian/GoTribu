
import React, { useContext } from 'react';
import {
  View,
  Text,
  Button,
  Alert,
  StyleSheet
} from 'react-native';

import { AuthContext } from '../AuthContext';

export default function DetalleViajeScreen({ route, navigation }) {
  const { trip } = route.params;
  const { deleteTrip } = useContext(AuthContext);

  const handleDelete = async () => {
    Alert.alert(
      'Eliminar Viaje',
      `¿Estás seguro de que quieres eliminar "${trip.titulo}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Borrar',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteTrip(trip.id);
              navigation.goBack(); // Vuelve a Home con lista actualizada
            } catch (error) {
              Alert.alert('Error al borrar', error.message);
            }
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Detalles del Viaje</Text>

      <Text style={styles.label}>Título:</Text>
      <Text>{trip.titulo}</Text>

      <Text style={styles.label}>Fechas:</Text>
      <Text>{trip.fechaIda} - {trip.fechaVuelta}</Text>

      <Text style={styles.label}>Número de días:</Text>
      <Text>{trip.dias}</Text>

      <Text style={styles.label}>Sitio:</Text>
      <Text>{trip.sitio}</Text>

      <Text style={styles.label}>Lugares de interés:</Text>
      <Text>{trip.lugares}</Text>

      <Text style={styles.label}>Presupuesto:</Text>
      <Text>{trip.presupuesto}</Text>

      <Button title="Borrar Viaje" color="#d32f2f" onPress={handleDelete} />

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
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontWeight: 'bold',
    marginTop: 15,
  },
});