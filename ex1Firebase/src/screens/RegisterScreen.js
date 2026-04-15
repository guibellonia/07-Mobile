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
import { auth, db } from '../config/firebaseConfig';

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !password || !birthDate) {
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
        birthDate,
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
        placeholder="Data de nascimento"
        value={birthDate}
        onChangeText={setBirthDate}
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
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  button: {
    backgroundColor: '#0f9d58',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  linkButton: {
    marginTop: 18,
    alignItems: 'center',
  },
  linkText: {
    color: '#0f9d58',
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
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
  },
  successModal: {
    backgroundColor: '#d4edda',
  },
  errorModal: {
    backgroundColor: '#f8d7da',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButton: {
    backgroundColor: '#0f9d58',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
