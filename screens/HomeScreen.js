
import React, { useContext, useState, useEffect } from 'react';
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

import { AuthContext } from '../AuthContext';
import { useFocusEffect } from '@react-navigation/native';

export default function HomeScreen({ navigation }) {
  const { user, getTripsByUserId } = useContext(AuthContext);
  const [userTrips, setUserTrips] = useState([]);

  const loadUserTrips = async () => {
    if (!user?.id) return;

    try {
      const tripsFromDB = await getTripsByUserId(user.id);
      setUserTrips(tripsFromDB);
    } catch (error) {
      console.error('Error cargando viajes:', error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      loadUserTrips();
    }, [user])
  );

  const renderTrip = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('DetalleViaje', { trip: item })}>
      <View style={styles.tripCard}>
        <Text style={styles.tripTitle}>{item.titulo}</Text>
        <Text>{item.fechaIda} - {item.fechaVuelta}</Text>
        <Text style={styles.tripDays}>{item.dias} días</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Mis Viajes</Text>

      {userTrips.length === 0 ? (
        <Text style={styles.empty}>No tienes viajes aún.</Text>
      ) : (
        <FlatList
          data={userTrips}
          renderItem={renderTrip}
          keyExtractor={item => item.id}
        />
      )}

      <TouchableOpacity style={styles.newTripButton} onPress={() => navigation.navigate('CrearViaje')}>
        <Text style={styles.newTripText}>+ Nuevo Viaje</Text>
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
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  empty: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 18,
    color: '#aaa',
  },
  tripCard: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginBottom: 10,
  },
  tripTitle: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  tripDays: {
    fontSize: 14,
    color: '#777',
  },
  newTripButton: {
    backgroundColor: '#fa904d',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 20,
  },
  newTripText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});