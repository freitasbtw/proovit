// src/screens/HomeScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { ChallengeCard } from '../components/ui/ChallengeCard';

export function HomeScreen() {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Meus Grupos</Text>
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.groupCard}>
          <View style={styles.groupHeader}>
            <View>
              <Text style={styles.groupTitle}>BEST HUMANS</Text>
              <View style={styles.statusRow}>
                <Ionicons name="trophy" size={16} color="#FFD700" style={{marginRight: 4}} />
                <Text style={styles.groupStatusText}>2º lugar (187pts)</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.moreBtn}>
              <Ionicons name="ellipsis-horizontal" size={24} color="#94a3b8" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.challengeList}>
            <TouchableOpacity onPress={() => navigation.navigate('Camera', { challengeId: '1' })}>
              <ChallengeCard 
                title="100 páginas" 
                progress="12/15" 
                status="success" 
                iconName="book"
              />
            </TouchableOpacity>
            
            <TouchableOpacity onPress={() => navigation.navigate('Camera', { challengeId: '2' })}>
              <ChallengeCard 
                title="Salada Diária" 
                progress="0/1" 
                status="warning" 
                iconName="nutrition"
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Camera', { challengeId: '3' })}>
              <ChallengeCard 
                title="Academia 5x" 
                progress="0/5" 
                status="danger" 
                iconName="barbell"
              />
            </TouchableOpacity>
          </View>
          
          <Text style={styles.motivational}>
            "Você tá mandando bem! Falta pouco hoje."
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
    backgroundColor: '#0f172a', // Slate 900
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    fontSize: 28,
    fontWeight: '800',
    color: '#f8fafc',
    marginBottom: 24,
    letterSpacing: -0.5,
  },
  groupCard: {
    backgroundColor: '#1e293b', // Slate 800
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#334155',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  groupHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  groupTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#f8fafc',
    marginBottom: 4,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  groupStatusText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#94a3b8',
  },
  moreBtn: {
    padding: 4,
  },
  divider: {
    height: 1,
    backgroundColor: '#334155',
    marginBottom: 16,
  },
  challengeList: {
    gap: 12,
  },
  motivational: {
    fontSize: 14,
    fontWeight: '500',
    color: '#a78bfa', // Violet 400
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#334155',
  }
});
