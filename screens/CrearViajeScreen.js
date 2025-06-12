// screens/CrearViajeScreen.js
import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  Platform,
  StyleSheet
} from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';
import { AuthContext } from '../AuthContext';

export default function CrearViajeScreen({ navigation }) {
  const { user, addTrip } = useContext(AuthContext);

  const [titulo, setTitulo] = useState('');
  const [fechaIda, setFechaIda] = useState(new Date());
  const [fechaVuelta, setFechaVuelta] = useState(new Date());
  const [showIdaPicker, setShowIdaPicker] = useState(false);
  const [showVueltaPicker, setShowVueltaPicker] = useState(false);
  const [sitio, setSitio] = useState('');
  const [lugares, setLugares] = useState('');
  const [presupuesto, setPresupuesto] = useState('');

  const [errorFecha, setErrorFecha] = useState(''); // Nuevo estado para errores

  const calcularDias = () => {
    const inicio = new Date(fechaIda);
    const fin = new Date(fechaVuelta);
    const diffTime = Math.abs(fin - inicio);
    return Math.ceil(diffTime / (1000 * 3600 * 24)) + 1;
  };

  const formatearFecha = (date) => {
    const dia = date.getDate();
    const mes = date.getMonth() + 1;
    const anyo = date.getFullYear();
    return `${dia}/${mes}/${anyo}`;
  };

  const handleSave = async () => {
    if (!titulo || !sitio) {
      Alert.alert('Error', 'Completa los campos obligatorios');
      return;
    }

    if (fechaVuelta < fechaIda) {
      Alert.alert('Fechas inválidas', 'La fecha de vuelta no puede ser anterior a la de ida');
      setErrorFecha('La fecha de vuelta no puede ser anterior a la de ida');
      return;
    } else {
      setErrorFecha('');
    }

    const diasCalculados = calcularDias();

    const trip = {
      titulo,
      fechaIda: formatearFecha(fechaIda),
      fechaVuelta: formatearFecha(fechaVuelta),
      dias: diasCalculados.toString(),
      sitio,
      lugares,
      presupuesto,
    };

    try {
      await addTrip(trip);
      Alert.alert('Éxito', 'Viaje guardado correctamente');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Título del viaje"
        value={titulo}
        onChangeText={setTitulo}
        style={styles.input}
      />

      <Text style={styles.label}>Fecha de ida</Text>
      <Button title={`Seleccionar Fecha Ida: ${formatearFecha(fechaIda)}`} onPress={() => setShowIdaPicker(true)} />
      {showIdaPicker && (
        <DateTimePicker
          value={fechaIda}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={(event, selectedDate) => {
            setShowIdaPicker(Platform.OS === 'ios');
            if (selectedDate) {
              setFechaIda(selectedDate);
              // Opcional: limpiar error si ya se corrigió
              if (selectedDate <= fechaVuelta) {
                setErrorFecha('');
              }
            }
          }}
        />
      )}

      <Text style={styles.label}>Fecha de vuelta</Text>
      <Button title={`Seleccionar Fecha Vuelta: ${formatearFecha(fechaVuelta)}`} onPress={() => setShowVueltaPicker(true)} />
      {showVueltaPicker && (
        <DateTimePicker
          value={fechaVuelta}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={(event, selectedDate) => {
            setShowVueltaPicker(Platform.OS === 'ios');
            if (selectedDate) {
              setFechaVuelta(selectedDate);
              // Limpiar error si se corrige
              if (selectedDate >= fechaIda) {
                setErrorFecha('');
              }
            }
          }}
        />
      )}

      {/* Mensaje de error */}
      {errorFecha !== '' && <Text style={styles.errorText}>{errorFecha}</Text>}

      <Text style={styles.diasLabel}>Número de días: {calcularDias()}</Text>

      <TextInput
        placeholder="Sitio"
        value={sitio}
        onChangeText={setSitio}
        style={styles.input}
      />

      <TextInput
        placeholder="Lugares de interés"
        value={lugares}
        onChangeText={setLugares}
        style={styles.input}
      />

      <TextInput
        placeholder="Presupuesto total"
        value={presupuesto}
        onChangeText={setPresupuesto}
        keyboardType="numeric"
        style={styles.input}
      />

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
  label: {
    fontWeight: 'bold',
    marginTop: 15,
  },
  diasLabel: {
    fontWeight: 'bold',
    fontSize: 16,
    marginVertical: 15,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 15,
  },
});