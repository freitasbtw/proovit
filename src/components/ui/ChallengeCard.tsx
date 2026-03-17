// src/components/ui/ChallengeCard.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  title: string;
  progress: string;
  status: 'success' | 'warning' | 'danger' | 'idle';
  iconName?: keyof typeof Ionicons.glyphMap;
}

const colors = {
  success: '#10b981', // Verde
  warning: '#f59e0b', // Amarelo
  danger: '#ef4444',  // Vermelho
  idle: '#2563eb'     // Azul highlight
};

const bgColors = {
  success: 'rgba(16, 185, 129, 0.1)',
  warning: 'rgba(245, 158, 11, 0.1)',
  danger: 'rgba(239, 68, 68, 0.1)',
  idle: 'rgba(37, 99, 235, 0.1)' // Azul
};

export function ChallengeCard({ title, progress, status, iconName }: Props) {
  const getStatusIcon = () => {
    switch (status) {
      case 'success': return 'checkmark-circle';
      case 'warning': return 'time';
      case 'danger': return 'alert-circle';
      default: return 'ellipse-outline';
    }
  };

  return (
    <View style={[styles.card, { 
      borderColor: colors[status],
      backgroundColor: bgColors[status] 
    }]}>
      <View style={styles.leftContent}>
        {iconName && (
          <View style={[styles.iconContainer, { backgroundColor: colors[status] }]}>
            <Ionicons name={iconName} size={20} color="#000" />
          </View>
        )}
        <Text style={styles.title}>{title}</Text>
      </View>
      
      <View style={styles.rightContent}>
        <Text style={[styles.progress, { color: colors[status] }]}>{progress}</Text>
        <Ionicons 
          name={getStatusIcon()} 
          size={24} 
          color={colors[status]} 
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderLeftWidth: 1, // Resetando o estilo anterior
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  rightContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  progress: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});
