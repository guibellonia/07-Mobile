import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('./assets/dede.jpg')} style={styles.profilePicture} />
      </View>
      <View style={styles.mainCard} activeOpacity={0.6}>
        <Text style={styles.valueText}>R$ 64,500.49</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.primaryButton} activeOpacity={0.6}>
            <Text style={styles.buttonText}>+ Registrar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryButton} activeOpacity={0.6}>
            <Text style={styles.lightButtonText}>Verificar</Text>
          </TouchableOpacity>
        </View>
      </View >
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 48,
    paddingHorizontal: 24,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 8,
  },
  header: {
    display: 'flex',
    flexDirection: "row",
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  profilePicture: {
    width: 48,
    height: 48,
    borderRadius: 999,
  },
  mainCard: {
    width: '100%',
    height: '64px',
    borderWidth: 1,
    backgroundColor: "#FCFAF9",
    borderColor: "#E5E5E5",
    borderRadius: 8,
    padding: 16,
    gap: 24,
  },
  primaryButton: {
    width: 'auto',
    backgroundColor: "#48E5C2",
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  secondaryButton: {
    width: 'auto',
    backgroundColor: "#333333",
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  buttonText: {
    fontSize: 16,
  },
  lightButtonText: {
    fontSize: 16,
    color: "#FFF",
  },
  valueText: {
    fontSize: 24,
    fontWeight: '400',
  },
  buttonContainer: {
    width: "100%",
    display: 'flex',
    flexDirection: "row",
    gap: 8,
  }
});
