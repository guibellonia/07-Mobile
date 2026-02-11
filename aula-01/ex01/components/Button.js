import React from "react"
import { Pressable, Text, StyleSheet } from 'react-native'

export default function Button({ title, onPress, type = 'primary' }) {
    return (
        <Pressable style={styles[type]} onPress={onPress}>
            <Text style={styles.buttonText}>{title}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    primary: {
        backgroundColor: '#ffd900',
        borderWidth: 1,
        borderColor: '#00000050',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
    },
    secondary: {
        backgroundColor: '#cccccc',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'medium',
    },
    pressedPrimary: {
        backgroundColor: '#e6c200',
        borderWidth: 1,
        borderColor: '#00000050',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
    },
    pressedSecondary: {
        backgroundColor: '#b3b3b3',
    }
})