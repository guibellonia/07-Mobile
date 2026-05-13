// App.js

import 'react-native-gesture-handler'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar'
import { Ionicons } from '@expo/vector-icons'

import PessoaListScreen from './src/screens/PessoaListScreen'
import PessoaFormScreen from './src/screens/PessoaFormScreen'
import PessoaDetailScreen from './src/screens/PessoaDetailScreen'

import ProdutoListScreen from './src/screens/ProdutoListScreen'
import ProdutoFormScreen from './src/screens/ProdutoFormScreen'
import ProdutoDetailScreen from './src/screens/ProdutoDetailScreen'

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

const screenOptions = {
  headerStyle: {
    backgroundColor: '#ffffff',
  },
  headerTitleStyle: {
    fontWeight: '700',
    fontSize: 18,
    color: '#0f172a',
  },
  headerTintColor: '#2563eb',
  headerShadowVisible: false,
  contentStyle: {
    backgroundColor: '#f8fafc',
  },
}

function PessoaStackNavigator() {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="PessoaList"
        component={PessoaListScreen}
        options={{ title: 'Lista de Pessoas', headerShown: false }}
      />
      <Stack.Screen
        name="PessoaDetail"
        component={PessoaDetailScreen}
        options={{ title: 'Detalhes' }}
      />
      <Stack.Screen
        name="PessoaForm"
        component={PessoaFormScreen}
        options={({ route }) => ({
          title: route.params?.id ? 'Editar Pessoa' : 'Nova Pessoa',
        })}
      />
    </Stack.Navigator>
  )
}

function ProdutoStackNavigator() {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="ProdutoList"
        component={ProdutoListScreen}
        options={{ title: 'Lista de Produtos', headerShown: false }}
      />
      <Stack.Screen
        name="ProdutoDetail"
        component={ProdutoDetailScreen}
        options={{ title: 'Detalhes' }}
      />
      <Stack.Screen
        name="ProdutoForm"
        component={ProdutoFormScreen}
        options={({ route }) => ({
          title: route.params?.id ? 'Editar Produto' : 'Novo Produto',
        })}
      />
    </Stack.Navigator>
  )
}

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <StatusBar style="dark" />
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarActiveTintColor: '#2563eb',
            tabBarInactiveTintColor: '#94a3b8',
            tabBarStyle: {
              backgroundColor: '#ffffff',
              borderTopColor: '#e2e8f0',
              borderTopWidth: 1,
              paddingBottom: 5,
              height: 60,
            },
            tabBarLabelStyle: {
              fontSize: 12,
              fontWeight: '600',
            },
            tabBarIcon: ({ focused, color }) => {
              let iconName

              if (route.name === 'Pessoas') {
                iconName = focused ? 'people' : 'people-outline'
              } else if (route.name === 'Produtos') {
                iconName = focused ? 'cube' : 'cube-outline'
              }

              return <Ionicons name={iconName} size={24} color={color} />
            },
          })}
        >
          <Tab.Screen
            name="Pessoas"
            component={PessoaStackNavigator}
            options={{ title: 'Pessoas' }}
          />
          <Tab.Screen
            name="Produtos"
            component={ProdutoStackNavigator}
            options={{ title: 'Produtos' }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  )
}
