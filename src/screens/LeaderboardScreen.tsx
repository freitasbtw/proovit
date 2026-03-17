import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export function LeaderboardScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Leaderboard</Text>
      <Text style={styles.subtitle}>Melhores da semana no BEST HUMANS</Text>
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
    color: '#FFD700',
  },
  subtitle: {
    color: '#aaa',
    marginTop: 8,
  }
});