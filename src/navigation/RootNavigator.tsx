import React from 'react';
import { View, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';

// Telas principais
import { HomeScreen } from '../screens/HomeScreen';
import { CreateGroupScreen } from '../screens/CreateGroupScreen';
import { LeaderboardScreen } from '../screens/LeaderboardScreen';
import { GroupsScreen } from '../screens/GroupsScreen';
import { ChecklistScreen } from '../screens/ChecklistScreen';
import { DirectScreen } from '../screens/DirectScreen';
import { ProfileScreen } from '../screens/ProfileScreen';

// Telas aninhadas (Stack)
import { CameraScreen } from '../screens/checkin/CameraScreen';

// Tipagem das rotas
export type RootStackParamList = {
  MainTabs: undefined;
  Camera: { challengeId: string };
  Direct: undefined;
};

export type BottomTabParamList = {
  Home: undefined;
  Explore: undefined;
  Checklist: undefined; // Novo: Checklist
  Groups: undefined;    // Novo: Grupos
  Profile: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<BottomTabParamList>();

// Bottom Tabs Navbar
function TabNavigator() {
  return (
    <Tab.Navigator
      sceneContainerStyle={{ backgroundColor: '#000' }} // Fundo preto explícito para as abas
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false, // Minimalista: sem labels
        tabBarActiveTintColor: '#2563eb', // Blue active (Azul escuro/Royal Blue)
        tabBarInactiveTintColor: '#666666', // Grey inactive
        tabBarStyle: {
          backgroundColor: '#000000', // Pure black
          borderTopWidth: 1,
          borderTopColor: '#1c1c1e',
          elevation: 0,
          height: Platform.OS === 'ios' ? 88 : 60,
          paddingTop: 10,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Explore':
              iconName = focused ? 'search' : 'search-outline';
              break;
            case 'Checklist':
              iconName = focused ? 'checkbox' : 'checkbox-outline';
              break;
            case 'Groups':
              iconName = focused ? 'people' : 'people-outline';
              break;
            case 'Profile':
              iconName = focused ? 'person' : 'person-outline';
              break;
            default:
              iconName = 'alert-circle';
          }

          return <Ionicons name={iconName} size={28} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Explore" component={LeaderboardScreen} />
      <Tab.Screen name="Checklist" component={ChecklistScreen} />
      <Tab.Screen name="Groups" component={GroupsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

// Navegador principal conectando as abas e o fluxo full-screen (Câmera)
export function RootNavigator() {
  const CustomDarkTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      primary: '#2563eb',
      background: '#000000',
      card: '#000000',
      text: '#ffffff',
      border: '#1c1c1e',
      notification: '#2563eb',
    },
  };

  return (
    <NavigationContainer theme={CustomDarkTheme}>
      <Stack.Navigator screenOptions={{ 
        headerShown: false,
        contentStyle: { backgroundColor: '#000' }, // Garante fundo preto na transição
        animation: 'fade', // Menos propenso a falhas de background branco
      }}>
        {/* Abas com a base da UI */}
        <Stack.Screen name="MainTabs" component={TabNavigator} />
        {/* Telas Fullscreen que ficam por cima das abas */}
        <Stack.Screen 
          name="Camera" 
          component={CameraScreen} 
          options={{ presentation: 'fullScreenModal' }} 
        />
        <Stack.Screen 
          name="Direct" 
          component={DirectScreen} 
          options={{ animation: 'slide_from_right' }} // Animação de entrada
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
