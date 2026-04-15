import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../src/config/firebaseConfig';
import { useFocusEffect } from '@react-navigation/native';

export default function ListScreen({ navigation }) {
  const [rentals, setRentals] = useState([]);

  const fetchRentals = useCallback(async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'rentals'));
      const rentalList = querySnapshot.docs.map((document) => ({
        id: document.id,
        ...document.data(),
      }));
      setRentals(rentalList);
    } catch (error) {
      alert('Erro ao carregar a lista de aluguéis.');
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchRentals();
    }, [fetchRentals])
  );

  const renderRental = ({ item }) => (
    <View style={styles.rentalCard}>
      <Text style={styles.carName}>{item.carName}</Text>
      <Text style={styles.detailText}>Cliente: {item.clientName}</Text>
      <Text style={styles.detailText}>Valor: R$ {item.rentalValue}</Text>
      <Text style={styles.detailText}>Data: {item.rentalDate}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Aluguéis</Text>
      <FlatList
        data={rentals}
        keyExtractor={(item) => item.id}
        renderItem={renderRental}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={<Text>Nenhum aluguel encontrado.</Text>}
      />

      <TouchableOpacity
        style={styles.linkButton}
        onPress={() => navigation.navigate('Registrar Aluguel')}
      >
        <Text style={styles.linkText}>Registrar Novo Aluguel</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#121212',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#FFFFFF',
  },
  listContent: {
    paddingBottom: 24,
  },
  rentalCard: {
    backgroundColor: '#1E1E1E',
    borderRadius: 5,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#333333',
  },
  carName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: '#9C27B0',
  },
  detailText: {
    color: '#FFFFFF',
    marginBottom: 4,
  },
  linkButton: {
    marginTop: 18,
    alignItems: 'center',
  },
  linkText: {
    color: '#9C27B0',
    textDecorationLine: 'underline',
  },
});