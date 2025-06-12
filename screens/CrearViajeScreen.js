
import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  Platform,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform as RNPlatform
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
  const [errorFecha, setErrorFecha] = useState('');

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
      setErrorFecha('La fecha de vuelta no puede ser anterior a la de ida');
      Alert.alert('Fechas inválidas', 'La fecha de vuelta debe ser posterior a la de ida');
      return;
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
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={100}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.label}>Título del viaje</Text>
        <TextInput
          placeholder="Ej: Vacaciones en París"
          value={titulo}
          onChangeText={setTitulo}
          style={styles.input}
        />

        <Text style={styles.label}>Fecha de ida</Text>
        <TouchableOpacity style={styles.pickerButton} onPress={() => setShowIdaPicker(true)}>
          <Text>{formatearFecha(fechaIda)}</Text>
        </TouchableOpacity>
        {showIdaPicker && (
          <DateTimePicker
            value={fechaIda}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={(event, selectedDate) => {
              setShowIdaPicker(Platform.OS === 'ios');
              if (selectedDate) setFechaIda(selectedDate);
            }}
          />
        )}

        <Text style={styles.label}>Fecha de vuelta</Text>
        <TouchableOpacity style={styles.pickerButton} onPress={() => setShowVueltaPicker(true)}>
          <Text>{formatearFecha(fechaVuelta)}</Text>
        </TouchableOpacity>
        {showVueltaPicker && (
          <DateTimePicker
            value={fechaVuelta}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={(event, selectedDate) => {
              setShowVueltaPicker(Platform.OS === 'ios');
              if (selectedDate) {
                setFechaVuelta(selectedDate);
                if (selectedDate >= fechaIda) setErrorFecha('');
              }
            }}
          />
        )}

        {errorFecha ? <Text style={styles.errorText}>{errorFecha}</Text> : null}

        <Text style={styles.diasLabel}>Número de días: {calcularDias()}</Text>

        <Text style={styles.label}>Sitio</Text>
        <TextInput
          placeholder="Ej: Barcelona"
          value={sitio}
          onChangeText={setSitio}
          style={styles.input}
        />

        <Text style={styles.label}>Lugares de interés</Text>
        <TextInput
          placeholder="Ej: Playas, Museos"
          value={lugares}
          onChangeText={setLugares}
          style={styles.input}
        />

        <Text style={styles.label}>Presupuesto total</Text>
        <TextInput
          placeholder="Ej: 1500"
          value={presupuesto}
          onChangeText={setPresupuesto}
          keyboardType="numeric"
          style={styles.input}
        />

        {/* Botón siempre visible al final */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Guardar Viaje</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    padding: 20,
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  label: {
    fontWeight: 'bold',
    marginTop: 15,
    fontSize: 16,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
  pickerButton: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 20,
    backgroundColor: '#fafafa',
  },
  saveButton: {
    backgroundColor: '#fa904d',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 30,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  diasLabel: {
    fontWeight: 'bold',
    fontSize: 16,
    marginVertical: 15,
    color: '#333',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 15,
  },
});