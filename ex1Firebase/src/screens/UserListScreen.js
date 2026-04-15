import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Alert,
  Pressable,
} from 'react-native';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';
import { Ionicons } from '@expo/vector-icons';

export default function UserListScreen({ navigation }) {
  const [users, setUsers] = useState([]);
  const [expandedUserId, setExpandedUserId] = useState(null);
  const [modalDeleteVisible, setModalDeleteVisible] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const fetchUsers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'users'));
      const userList = querySnapshot.docs.map((document) => ({
        id: document.id,
        ...document.data(),
      }));
      setUsers(userList);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar a lista de usuários.');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const toggleDetails = (id) => {
    setExpandedUserId(expandedUserId === id ? null : id);
  };

  const confirmDelete = (user) => {
    setUserToDelete(user);
    setModalDeleteVisible(true);
  };

  const handleDelete = async () => {
    if (!userToDelete) {
      return;
    }

    try {
      await deleteDoc(doc(db, 'users', userToDelete.id));
      setModalDeleteVisible(false);
      setUserToDelete(null);
      fetchUsers();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível excluir o usuário.');
    }
  };

  const renderUser = ({ item }) => (
    <View style={styles.userCard}>
      <View style={styles.userMainRow}>
        <Text style={styles.userName}>{item.name}</Text>
        <View style={styles.iconGroup}>
          <TouchableOpacity onPress={() => toggleDetails(item.id)}>
            <Ionicons
              name={expandedUserId === item.id ? 'eye' : 'eye-off'}
              size={24}
              color="#555"
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('EditUser', { userData: item })}
          >
            <Ionicons
              name="pencil"
              size={24}
              color="#007bff"
              style={{ marginHorizontal: 15 }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => confirmDelete(item)}>
            <Ionicons name="trash" size={24} color="#dc3545" />
          </TouchableOpacity>
        </View>
      </View>

      {expandedUserId === item.id && (
        <View style={styles.detailsBox}>
          <Text style={styles.detailText}>E-mail: {item.email}</Text>
          <Text style={styles.detailText}>Nascimento: {item.birthDate}</Text>
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Usuários</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={renderUser}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={<Text>Nenhum usuário encontrado.</Text>}
      />

      <Modal transparent visible={modalDeleteVisible} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Confirmar exclusão</Text>
            <Text style={styles.modalText}>
              Deseja realmente excluir {userToDelete?.name}?
            </Text>
            <View style={styles.modalButtons}>
              <Pressable
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setModalDeleteVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancelar</Text>
              </Pressable>
              <Pressable
                style={[styles.modalButton, styles.deleteButton]}
                onPress={handleDelete}
              >
                <Text style={styles.modalButtonText}>Excluir</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  listContent: {
    paddingBottom: 24,
  },
  userCard: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  userMainRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
  },
  iconGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailsBox: {
    marginTop: 14,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  detailText: {
    color: '#555',
    marginBottom: 6,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  modalContent: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 22,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  modalText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  modalButton: {
    flex: 1,
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#6c757d',
    marginRight: 8,
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    marginLeft: 8,
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
