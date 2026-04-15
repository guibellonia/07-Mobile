import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Pressable,
} from 'react-native';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../src/config/firebaseConfig';

export default function FormScreen({ navigation }) {
  const [carName, setCarName] = useState('');
  const [clientName, setClientName] = useState('');
  const [rentalValue, setRentalValue] = useState('');
  const [rentalDate, setRentalDate] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSave = async () => {
    if (!carName || !clientName || !rentalValue || !rentalDate) {
      setModalMessage('Por favor, preencha todos os campos.');
      setIsSuccess(false);
      setModalVisible(true);
      return;
    }

    try {
      await addDoc(collection(db, 'rentals'), {
        carName,
        clientName,
        rentalValue: parseFloat(rentalValue),
        rentalDate,
        createdAt: new Date().toISOString(),
      });

      setModalMessage('Aluguel registrado com sucesso!');
      setIsSuccess(true);
      setModalVisible(true);

      setCarName('');
      setClientName('');
      setRentalValue('');
      setRentalDate('');
    } catch (error) {
      setIsSuccess(false);
      setModalMessage('Erro ao salvar: ' + error.message);
      setModalVisible(true);
    }
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    if (isSuccess) {
      // Seria interessante adicionar alguma lógica de navegação aqui
      // mas não vou fazer porque prefiro deixar cadastrar repetidamente
      // navigation.navigate('List');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrar Aluguel</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome do Carro"
        value={carName}
        onChangeText={setCarName}
      />

      <TextInput
        style={styles.input}
        placeholder="Nome do Cliente"
        value={clientName}
        onChangeText={setClientName}
      />

      <TextInput
        style={styles.input}
        placeholder="Valor do Aluguel"
        keyboardType="numeric"
        value={rentalValue}
        onChangeText={setRentalValue}
      />

      <TextInput
        style={styles.input}
        placeholder="Data do Aluguel (DD/MM/YYYY)"
        value={rentalDate}
        onChangeText={setRentalDate}
      />

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Salvar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.linkButton}
        onPress={() => navigation.navigate('Lista de Aluguéis')}
      >
        <Text style={styles.linkText}>Ver Lista de Aluguéis</Text>
      </TouchableOpacity>

      <Modal transparent visible={modalVisible} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, isSuccess ? styles.successModal : styles.errorModal]}>
            <Text style={styles.modalText}>{modalMessage}</Text>
            <Pressable style={styles.modalButton} onPress={handleCloseModal}>
              <Text style={styles.modalButtonText}>OK</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#121212',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
    color: '#FFFFFF',
  },
  input: {
    backgroundColor: '#1E1E1E',
    borderRadius: 5,
    padding: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#333333',
    color: '#FFFFFF',
  },
  button: {
    backgroundColor: '#9C27B0',
    padding: 16,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  linkButton: {
    marginTop: 18,
    alignItems: 'center',
  },
  linkText: {
    color: '#9C27B0',
    textDecorationLine: 'underline',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  modalContent: {
    width: '85%',
    borderRadius: 5,
    padding: 24,
    alignItems: 'center',
  },
  successModal: {
    backgroundColor: '#9C27B0',
  },
  errorModal: {
    backgroundColor: '#F44336',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    color: '#FFFFFF',
  },
  modalButton: {
    backgroundColor: '#9C27B0',
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  modalButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});