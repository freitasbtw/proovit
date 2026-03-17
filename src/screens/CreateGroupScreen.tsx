import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export function CreateGroupScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Novo Desafio</Text>
      <Text style={styles.subtitle}>Crie regras, defina desafios e convide a galera.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#111',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    color: '#aaa',
    marginTop: 8,
  }
});