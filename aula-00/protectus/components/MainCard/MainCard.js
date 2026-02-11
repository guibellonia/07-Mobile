import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const MainCard = ({ value, onPrimary, onSecondary }) => {
  return (
    <View style={styles.mainCard}>
      <Text style={styles.valueText}>{value}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.primaryButton} onPress={onPrimary} activeOpacity={0.6}>
          <Text style={styles.buttonText}>+ Registrar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryButton} onPress={onSecondary} activeOpacity={0.6}>
          <Text style={styles.lightButtonText}>Verificar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

MainCard.defaultProps = {
  value: 'R$ 0,00',
  onPrimary: () => {},
  onSecondary: () => {},
};

export default MainCard;

const styles = StyleSheet.create({
  mainCard: {
    width: '100%',
    height: '64px',
    borderWidth: 1,
    backgroundColor: '#FCFAF9',
    borderColor: '#E5E5E5',
    borderRadius: 8,
    padding: 16,
    gap: 24,
  },
  primaryButton: {
    width: 'auto',
    backgroundColor: '#48E5C2',
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  secondaryButton: {
    width: 'auto',
    backgroundColor: '#333333',
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  buttonText: {
    fontSize: 16,
  },
  lightButtonText: {
    fontSize: 16,
    color: '#FFF',
  },
  valueText: {
    fontSize: 24,
    fontWeight: '400',
  },
  buttonContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
  },
});
