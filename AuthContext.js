
import React, { createContext, useState, useEffect } from 'react';
import { openDatabase } from 'react-native-sqlite-storage';

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [trips, setTrips] = useState([]);

  const db = openDatabase('goTribu.db');

  // Crear tablas si no existen
  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS users (id TEXT PRIMARY KEY, email TEXT UNIQUE, password TEXT)'
      );

      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS trips (id TEXT PRIMARY KEY, userId TEXT, titulo TEXT, fechaIda TEXT, fechaVuelta TEXT, dias INTEGER, sitio TEXT, lugares TEXT, presupuesto REAL, FOREIGN KEY(userId) REFERENCES users(id))'
      );
    });
  }, []);

  // Cargar viajes por userId
  const getTripsByUserId = async (userId) => {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM trips WHERE userId = ?',
          [userId],
          (_, { rows }) => {
            const tripsList = [];
            for (let i = 0; i < rows.length; i++) {
              tripsList.push(rows.item(i));
            }

            setTrips(tripsList);
            resolve(tripsList);
          },
          error => reject(error)
        );
      });
    });
  };

  // Iniciar sesión
  const signIn = async (email) => {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM users WHERE email = ?',
          [email],
          (_, { rows }) => {
            if (rows.length > 0) {
              const user = rows.item(0);
              setUser(user);
              resolve(user);
            } else {
              reject(new Error('Usuario no encontrado'));
            }
          },
          error => reject(error)
        );
      });
    });
  };

  // Registrar usuario
  const signUp = async (email, password) => {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'INSERT INTO users (id, email, password) VALUES (?, ?, ?)',
          [Date.now().toString(), email, password],
          (_, { rowsAffected }) => {
            if (rowsAffected > 0) {
              resolve(true);
            } else {
              reject(new Error('Error al registrar usuario'));
            }
          },
          error => reject(error)
        );
      });
    });
  };

  // Guardar nuevo viaje
  const addTrip = async (trip) => {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'INSERT INTO trips (id, userId, titulo, fechaIda, fechaVuelta, dias, sitio, lugares, presupuesto) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
          [
            Date.now().toString(),
            user.id,
            trip.titulo,
            trip.fechaIda,
            trip.fechaVuelta,
            trip.dias,
            trip.sitio,
            trip.lugares,
            trip.presupuesto
          ],
          (_, { rowsAffected }) => {
            if (rowsAffected > 0) {
              setTrips(prev => [...prev, {
                id: Date.now().toString(),
                userId: user.id,
                ...trip
              }]);
              resolve(true);
            } else {
              reject(new Error('Error al guardar el viaje'));
            }
          },
          error => reject(error)
        );
      });
    });
  };

  // Eliminar viaje por ID
  const deleteTrip = async (tripId) => {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'DELETE FROM trips WHERE id = ?',
          [tripId],
          (_, { rowsAffected }) => {
            if (rowsAffected > 0) {
              setTrips(prev => prev.filter(t => t.id !== tripId));
              resolve(true);
            } else {
              reject(new Error('No se encontró el viaje'));
            }
          },
          error => reject(error)
        );
      });
    });
  };

  // Cerrar sesión
  const signOut = () => {
    setUser(null);
    setTrips([]);
  };

  return (
    <AuthContext.Provider value={{
      user,
      trips,
      signIn,
      signUp,
      signOut,
      addTrip,
      getTripsByUserId,
      deleteTrip, 
    }}>
      {children}
    </AuthContext.Provider>
  );
}