import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const BottomNav = ({ items, onSelect }) => {
  return (
    <View style={styles.container}>
      {items.map((it, idx) => (
        <TouchableOpacity key={idx} style={styles.item} onPress={() => onSelect(idx)} activeOpacity={0.7}>
          <Text style={styles.itemText}>{it}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

BottomNav.defaultProps = {
  items: ['Início', 'Registrar', 'Perfil'],
  onSelect: () => {},
};

export default BottomNav;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 64,
    borderTopWidth: 1,
    borderColor: '#E5E5E5',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  item: {
    padding: 8,
  },
  itemText: {
    fontSize: 14,
  },
});
