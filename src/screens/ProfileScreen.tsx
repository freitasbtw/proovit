import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export function ProfileScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={28} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="settings-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.profileInfo}>
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150' }} 
              style={styles.avatar} 
            />
            <Text style={styles.userName}>Matheus Bedeschi</Text>
            <Text style={styles.level}>Level 8</Text>
            
            <View style={styles.xpContainer}>
               <View style={styles.xpBarBg}>
                  <View style={[styles.xpBarFill, { width: '50%' }]} />
               </View>
               <Text style={styles.xpText}>3100 / 6200 xp</Text>
            </View>
        </View>
      </View>

      {/* Stats */}
      <View style={styles.statsRow}>
          <View style={styles.statItem}>
             <Text style={styles.statValue}>12</Text>
             <Text style={styles.statLabel}>Check-ins</Text>
          </View>
          <View style={styles.statItem}>
             <Text style={styles.statValue}>10</Text>
             <Text style={styles.statLabel}>Dias ativos</Text>
          </View>
          <View style={styles.statItem}>
             <Text style={styles.statValue}>10h 15m</Text>
             <Text style={styles.statLabel}>Duração</Text>
          </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
         {/* Activities */}
         <View style={styles.section}>
            <View style={styles.sectionHeader}>
               <Text style={styles.sectionTitle}>Suas atividades</Text>
               <TouchableOpacity>
                  <Text style={styles.seeMore}>Ver mais</Text>
               </TouchableOpacity>
            </View>

            <View style={styles.calendarStrip}>
               {[10, 10, 11].map((d, i) => (
                   <View key={i} style={styles.dayCircle}>
                     <Text style={styles.dayText}>{d}</Text>
                   </View>
               ))}
               <View style={styles.todayPill}>
                  <Text style={styles.todayText}>Hoje, 12 Jan</Text>
               </View>
               {[13, 14, 15].map((d, i) => (
                   <View key={i + 10} style={styles.dayCircleDark}>
                      <Text style={styles.dayTextDark}>{d}</Text>
                   </View>
               ))}
            </View>
            <Text style={styles.emptyState}>Nenhum check-in feito hoje.</Text>
         </View>

         {/* Achievements */}
         <View style={styles.section}>
            <Text style={styles.sectionTitle}>Conquistas</Text>
            
            <TouchableOpacity style={styles.achievementItem}>
               <View style={styles.iconContainer}>
                  <Ionicons name="body" size={24} color="#fff" />
               </View>
               <View style={styles.achievementContent}>
                  <Text style={styles.achievementTitle}>Tutorial do Gym Rats</Text>
                  <View style={styles.achievementMeta}>
                     <Text style={styles.achievementSub}>5/5 Conquistas</Text>
                     <Text style={styles.achievementXp}>500 xp</Text>
                  </View>
                  <View style={styles.progressBarBg}>
                     <View style={[styles.progressBarFill, { width: '100%' }]} />
                  </View>
               </View>
               <Ionicons name="chevron-forward" size={20} color="#666" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.achievementItem}>
               <View style={styles.iconContainer}>
                  <Ionicons name="heart" size={24} color="#fff" />
               </View>
               <View style={styles.achievementContent}>
                  <Text style={styles.achievementTitle}>Saúde e Bem-estar</Text>
                   <View style={styles.achievementMeta}>
                     <Text style={styles.achievementSub}>12/23 Conquistas</Text>
                     <Text style={styles.achievementXp}>1000 / 2000 xp</Text>
                  </View>
                  <View style={styles.progressBarBg}>
                     <View style={[styles.progressBarFill, { width: '50%' }]} />
                  </View>
               </View>
               <Ionicons name="chevron-forward" size={20} color="#666" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.achievementItem}>
               <View style={styles.iconContainer}>
                  <Ionicons name="trophy" size={24} color="#fff" />
               </View>
               <View style={styles.achievementContent}>
                  <Text style={styles.achievementTitle}>Desafios e Competição</Text>
                   <View style={styles.achievementMeta}>
                     <Text style={styles.achievementSub}>1/3 Conquistas</Text>
                     <Text style={styles.achievementXp}>100 / 300 xp</Text>
                  </View>
                  <View style={styles.progressBarBg}>
                     <View style={[styles.progressBarFill, { width: '30%' }]} />
                  </View>
               </View>
               <Ionicons name="chevron-forward" size={20} color="#666" />
            </TouchableOpacity>
         </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginTop: 10,
  },
  profileInfo: {
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 12,
  },
  userName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  level: {
    color: '#a1a1aa',
    fontSize: 14,
    marginBottom: 12,
  },
  xpContainer: {
    width: 150,
    alignItems: 'center',
  },
  xpBarBg: {
    width: '100%',
    height: 4,
    backgroundColor: '#333',
    borderRadius: 2,
    marginBottom: 6,
  },
  xpBarFill: {
    height: '100%',
    backgroundColor: '#2563eb', // Highlight Blue
    borderRadius: 2,
  },
  xpText: {
    color: '#a1a1aa',
    fontSize: 10,
    fontWeight: '600',
  },
  
  // Stats
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 32,
    paddingHorizontal: 16,
    gap: 40,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    color: '#a1a1aa',
    fontSize: 12,
  },

  content: {
    flex: 1,
    paddingHorizontal: 16,
  },

  // Activities
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  seeMore: {
    color: '#2563eb', // Highlight blue
    fontSize: 12,
    fontWeight: '600',
  },
  calendarStrip: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  dayCircle: {
     width: 36,
     height: 36,
     borderRadius: 18,
     backgroundColor: '#fff',
     justifyContent: 'center',
     alignItems: 'center',
  },
  dayText: {
     color: '#000', 
     fontSize: 14,
     fontWeight: '600',
  },
  dayCircleDark: {
     width: 36,
     height: 36,
     borderRadius: 18,
     justifyContent: 'center',
     alignItems: 'center',
  },
  dayTextDark: {
     color: '#a1a1aa', 
     fontSize: 14,
     fontWeight: '600',
  },
  todayPill: {
     backgroundColor: '#2563eb', // Highlight blue
     paddingHorizontal: 16,
     paddingVertical: 10,
     borderRadius: 20,
  },
  todayText: {
     color: '#fff',
     fontSize: 14,
     fontWeight: 'bold',
  },
  emptyState: {
    color: '#a1a1aa',
    textAlign: 'center',
    fontSize: 14,
    marginTop: 8,
  },

  // Achievements
  achievementItem: {
     flexDirection: 'row',
     alignItems: 'center',
     marginBottom: 24,
  },
  iconContainer: {
     width: 56,
     height: 56,
     borderRadius: 28,
     backgroundColor: '#2563eb', // Highlight blue background
     justifyContent: 'center',
     alignItems: 'center',
     marginRight: 16,
  },
  achievementContent: {
     flex: 1,
     marginRight: 12,
  },
  achievementTitle: {
     color: '#fff',
     fontSize: 16,
     fontWeight: '600',
     marginBottom: 6,
  },
  achievementMeta: {
     flexDirection: 'row',
     justifyContent: 'space-between',
     marginBottom: 8,
  },
  achievementSub: {
     color: '#a1a1aa',
     fontSize: 11,
     fontWeight: '500',
  },
  achievementXp: {
     color: '#a1a1aa',
     fontSize: 11,
     fontWeight: '500',
  },
  progressBarBg: {
     width: '100%',
     height: 4,
     backgroundColor: '#333',
     borderRadius: 2,
  },
  progressBarFill: {
     height: '100%',
     backgroundColor: '#2563eb', // Highlight blue
     borderRadius: 2,
  }
});