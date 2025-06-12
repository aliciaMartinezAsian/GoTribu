
import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert
} from 'react-native';

import { AuthContext } from '../AuthContext';

export default function DetalleViajeScreen({ route, navigation }) {
  const { trip } = route.params;
  const { deleteTrip } = useContext(AuthContext);

  const handleDelete = () => {

    Alert.alert(
      'Eliminar Viaje',
      `¿Estás seguro de querer eliminar "${trip.titulo}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Borrar',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteTrip(trip.id);
              navigation.goBack(); 
            } catch (error) {
              Alert.alert('Error', error.message);
            }
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      
      <Text style={styles.sectionTitle}>Detalles del Viaje</Text>

      
      <View style={styles.detailRow}>
        <Text style={styles.label}>Título:</Text>
        <Text style={styles.value}>{trip.titulo}</Text>
      </View>

      
      <View style={styles.detailRow}>
        <Text style={styles.label}>Fecha Ida:</Text>
        <Text style={styles.value}>{trip.fechaIda}</Text>
      </View>
      <View style={styles.detailRow}>
        <Text style={styles.label}>Fecha Vuelta:</Text>
        <Text style={styles.value}>{trip.fechaVuelta}</Text>
      </View>

      
      <View style={styles.detailRow}>
        <Text style={styles.label}>Días:</Text>
        <Text style={styles.value}>{trip.dias}</Text>
      </View>

      
      <View style={styles.detailRow}>
        <Text style={styles.label}>Sitio:</Text>
        <Text style={styles.value}>{trip.sitio}</Text>
      </View>

      
      <View style={styles.detailRow}>
        <Text style={styles.label}>Lugares:</Text>
        <Text style={styles.value}>{trip.lugares || 'No especificado'}</Text>
      </View>

      
      <View style={styles.detailRow}>
        <Text style={styles.label}>Presupuesto:</Text>
        <Text style={styles.value}>{trip.presupuesto ? `$${trip.presupuesto}` : 'No especificado'}</Text>
      </View>

      
      <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Volver</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={handleDelete}>
        <Text style={styles.buttonText}>Eliminar Viaje</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  detailRow: {
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 10,
  },
  label: {
    fontWeight: 'bold',
    color: '#333',
    fontSize: 16,
  },
  value: {
    fontSize: 16,
    marginLeft: 10,
    marginTop: 5,
    color: '#555',
  },
  button: {
    backgroundColor: '#fa904d',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  deleteButton: {
    backgroundColor: '#d32f2f',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});