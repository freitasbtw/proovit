import React from 'react';
import { View, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

// Telas principais
import { HomeScreen } from '../screens/HomeScreen';
import { CreateGroupScreen } from '../screens/CreateGroupScreen';
import { LeaderboardScreen } from '../screens/LeaderboardScreen';
// Telas aninhadas (Stack)
import { CameraScreen } from '../screens/checkin/CameraScreen';

// Tipagem das rotas
export type RootStackParamList = {
  MainTabs: undefined;
  Camera: { challengeId: string };
};

export type BottomTabParamList = {
  Home: undefined;
  Criar: undefined;
  Ranking: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<BottomTabParamList>();

// Bottom Tabs Navbar
function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false, // Minimalista: sem labels
        tabBarActiveTintColor: '#a78bfa',
        tabBarInactiveTintColor: '#64748b',
        tabBarStyle: {
          backgroundColor: '#0f172a',
          borderTopWidth: 0,
          elevation: 0,
          height: Platform.OS === 'ios' ? 88 : 60,
          paddingTop: 10,
        },
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === 'Criar') {
            return (
              <View style={{
                top: -20,
                width: 56,
                height: 56,
                borderRadius: 28,
                backgroundColor: '#a78bfa',
                justifyContent: 'center',
                alignItems: 'center',
                shadowColor: '#a78bfa',
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.5,
                shadowRadius: 8,
                elevation: 4,
              }}>
                <Ionicons name="add" size={32} color="#fff" />
              </View>
            );
          }

          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Ranking') {
            iconName = focused ? 'trophy' : 'trophy-outline';
          } else {
            iconName = 'alert-circle';
          }

          return <Ionicons name={iconName} size={28} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Criar" component={CreateGroupScreen} />
      <Tab.Screen name="Ranking" component={LeaderboardScreen} />
    </Tab.Navigator>
  );
}

// Navegador principal conectando as abas e o fluxo full-screen (Câmera)
export function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* Abas com a base da UI */}
        <Stack.Screen name="MainTabs" component={TabNavigator} />
        {/* Telas Fullscreen que ficam por cima das abas */}
        <Stack.Screen 
          name="Camera" 
          component={CameraScreen} 
          options={{ presentation: 'fullScreenModal' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
