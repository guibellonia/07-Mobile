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
import {
  createUserWithEmailAndPassword,
  deleteUser,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../src/config/firebaseConfig';

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !password) {
      setModalMessage('Por favor, preencha todos os campos.');
      setIsSuccess(false);
      setModalVisible(true);
      return;
    }

    let userCreated = null;

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password,
      );

      userCreated = userCredential.user;

      await setDoc(doc(db, 'users', userCreated.uid), {
        name,
        email: email.trim(),
        createdAt: new Date().toISOString(),
      });

      setModalMessage('Cadastro realizado com sucesso!');
      setIsSuccess(true);
      setModalVisible(true);
    } catch (error) {
      if (userCreated && error.code !== 'auth/email-already-in-use') {
        try {
          await deleteUser(userCreated);
        } catch (rollbackError) {
          console.error('Falha ao reverter criação de usuário:', rollbackError);
        }
      }

      setIsSuccess(false);

      if (error.code === 'auth/email-already-in-use') {
        setModalMessage('Este e-mail já está em uso.');
      } else if (error.code === 'auth/weak-password') {
        setModalMessage('A senha deve ter pelo menos 6 caracteres.');
      } else if (error.code === 'permission-denied') {
        setModalMessage('Erro de permissão no Banco de Dados. Verifique as regras do Firestore.');
      } else {
        setModalMessage('Falha ao cadastrar: ' + error.message);
      }
      setModalVisible(true);
    }
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    if (isSuccess) {
      navigation.replace('Login');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="E-mail"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.linkButton}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.linkText}>Já tem conta? Faça login</Text>
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