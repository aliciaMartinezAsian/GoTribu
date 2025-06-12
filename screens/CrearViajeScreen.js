
import React, { useState } from 'react';
import {
  View,
  TextInput,
  Button,
  Alert,
  StyleSheet
} from 'react-native';
import { AuthContext } from '../AuthContext';
import { useContext } from 'react';

export default function CrearViajeScreen({ navigation }) {
  const { user, addTrip } = useContext(AuthContext);

  const [titulo, setTitulo] = useState('');
  const [fechaIda, setFechaIda] = useState('');
  const [fechaVuelta, setFechaVuelta] = useState('');
  const [dias, setDias] = useState('');
  const [sitio, setSitio] = useState('');
  const [lugares, setLugares] = useState('');
  const [presupuesto, setPresupuesto] = useState('');

  const handleSave = async () => {
    if (!titulo || !fechaIda || !fechaVuelta || !sitio) {
      Alert.alert('Error', 'Por favor completa todos los campos obligatorios');
      return;
    }

    const trip = {
      titulo,
      fechaIda,
      fechaVuelta,
      dias,
      sitio,
      lugares,
      presupuesto,
    };

    try {
      await addTrip(trip);
      Alert.alert('Éxito', 'Viaje guardado correctamente');

      // Opcional: limpiar formulario
      setTitulo('');
      setFechaIda('');
      setFechaVuelta('');
      setDias('');
      setSitio('');
      setLugares('');
      setPresupuesto('');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Título del viaje" value={titulo} onChangeText={setTitulo} style={styles.input} />
      <TextInput placeholder="Fecha ida (dd/mm/aaaa)" value={fechaIda} onChangeText={setFechaIda} style={styles.input} />
      <TextInput placeholder="Fecha vuelta (dd/mm/aaaa)" value={fechaVuelta} onChangeText={setFechaVuelta} style={styles.input} />
      <TextInput placeholder="Número de días" value={dias} onChangeText={setDias} keyboardType="numeric" style={styles.input} />
      <TextInput placeholder="Sitio" value={sitio} onChangeText={setSitio} style={styles.input} />
      <TextInput placeholder="Lugares de interés" value={lugares} onChangeText={setLugares} style={styles.input} />
      <TextInput placeholder="Presupuesto total" value={presupuesto} onChangeText={setPresupuesto} keyboardType="numeric" style={styles.input} />

      <Button title="Guardar Viaje" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
});