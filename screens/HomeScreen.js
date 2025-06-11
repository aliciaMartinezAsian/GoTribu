import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { firestore } from '../services/firebase';
import { collection, query, where, getDocs } from '@react-native-firebase/firestore';

export default function HomeScreen({ navigation }) {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const q = query(collection(firestore(), 'trips'), where('userId', '==', firestore().auth().currentUser?.uid));
        const snapshot = await getDocs(q);
        const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setTrips(list);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, []);

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

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : trips.length === 0 ? (
        <Text style={styles.empty}>No tienes viajes aún.</Text>
      ) : (
        <FlatList
          data={trips}
          renderItem={renderTrip}
          keyExtractor={item => item.id}
        />
      )}
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
  },
});