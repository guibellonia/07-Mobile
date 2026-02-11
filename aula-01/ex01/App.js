import React, { useState, useEffect } from "react"
import { View, Text, StyleSheet } from 'react-native'
import Button from './components/Button'

export default function App() {
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    checkStillPressed();
  }, [pressed]);

  const checkStillPressed = () => {
    if (pressed) {
      setTimeout(() => {
        setPressed(false);
      }
      , 2000);
    }
  }

  return (
    <View style={styles.primaryDiv}>
      <View style={styles.card}>
        <Text>Fome</Text>
      </View>
      <View style={styles.card}>
        <Text>Sede</Text>
      </View>
      <Button title="Clique aqui" onPress={() => setPressed(!pressed)} type={pressed ? "pressedPrimary" : "primary"} />
    </View>
  )
}

const styles = StyleSheet.create({
  primaryDiv: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    paddingVertical: 48,
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#00000050',
  },
  button: {
    backgroundColor: '#ffd900',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  }
})