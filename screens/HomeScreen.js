
import React, { useContext, useState, useEffect } from 'react';
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  Button
} from 'react-native';
import { AuthContext } from '../AuthContext';
import { useFocusEffect } from '@react-navigation/native';

export default function HomeScreen({ navigation }) {
  const { user, trips, getTripsByUserId } = useContext(AuthContext);
  const [userTrips, setUserTrips] = useState([]);


  useFocusEffect(
    React.useCallback(() => {
      loadUserTrips();
    }, [user])
  );

  const loadUserTrips = async () => {
    if (!user?.id) return;

    try {
      const tripsFromDB = await getTripsByUserId(user.id);
      setUserTrips(tripsFromDB);
    } catch (error) {
      console.error('Error cargando viajes', error);
    }
  };


  useEffect(() => {
    if (user && trips) {
      const filtered = trips.filter(t => t.userId === user.id);
      setUserTrips(filtered);
    }
  }, [trips, user]);

  const renderTrip = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('DetalleViaje', { trip: item })}>
      <View style={styles.tripCard}>
        <Text style={styles.title}>{item.titulo}</Text>
        <Text>{item.fechaIda} - {item.fechaVuelta}</Text>
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

      <Button title="Nuevo Viaje" onPress={() => navigation.navigate('CrearViaje')} />
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
    textAlign: 'center',
  },
  empty: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 18,
    color: '#666',
  },
  tripCard: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});