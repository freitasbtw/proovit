import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

// Mock Data
const POSTS = [
  {
    id: '1',
    user: { name: 'João Silva', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150' },
    group: { name: 'Clube da Leitura' },
    time: '2h',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&q=80', 
    title: 'Desafio: 100 páginas',
    description: 'Hoje a meta foi batida com sucesso! Li 15 páginas.',
    status: 'completed',
    likes: 12,
    comments: 3,
  },
  {
    id: '2',
    user: { name: 'Maria Souza', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150' },
    group: { name: 'Gym Rats' },
    time: '5h',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80', 
    title: 'Treino de Pernas',
    description: 'Começando a semana com aquele treino pesado. #legday',
    status: 'completed',
    likes: 87,
    comments: 14,
  },
  {
    id: '3',
    user: { name: 'Carlos Luccas', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150' },
    group: { name: 'No Sugar' },
    time: '6h',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=80', 
    title: 'Zero Açúcar',
    description: 'Dia 5 sem açúcar processado.',
    status: 'pending',
    likes: 24,
    comments: 5,
  },
  {
    id: '4',
    user: { name: 'Ana Clara', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150' },
    group: { name: 'Meditação' },
    time: '1h',
    image: 'https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?w=800&q=80',
    title: 'Mindfulness',
    description: '10 minutos de paz interior.',
    status: 'completed',
    likes: 45,
    comments: 8,
  }
];

const SCREEN_WIDTH = Dimensions.get('window').width;
const GAP = 12;
const PADDING = 16;
// Calculate column width for 2 columns with padding and gap
const COLUMN_WIDTH = (SCREEN_WIDTH - (PADDING * 2) - GAP) / 2;

export function HomeScreen() {
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.headerTopRow}>
            {/* User Profile */}
            <TouchableOpacity 
              style={styles.profileSection}
              onPress={() => navigation.navigate('Profile')}
            >
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150' }} 
                style={styles.avatar} 
              />
              <View>
                <Text style={styles.greetingText}>Olá, Matheus</Text>
                <Text style={styles.userLevel}>Level 8</Text>
              </View>
            </TouchableOpacity>

            {/* Icons */}
            <View style={styles.headerIcons}>
              <TouchableOpacity 
                style={styles.iconBtn}
                onPress={() => navigation.navigate('Direct')}
              >
                <Ionicons name="chatbubble-ellipses-outline" size={26} color="#fff" />
                <View style={styles.badge}><Text style={styles.badgeText}>2</Text></View>
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.pageTitle}>Como você está hoje?</Text>
        </View>

        {/* Goal Cards */}
        <View style={styles.cardsRow}>
          {/* Daily Goal */}
          <View style={[styles.goalCard, styles.dailyCard]}>
            <View style={styles.goalCardHeader}>
              <Ionicons name="checkmark-circle-outline" size={24} color="#fff" />
              <Text style={styles.goalLabel}>Meta diária</Text>
            </View>
            <Text style={styles.goalValue}>Tomar 2 litros de água</Text>
          </View>
        </View>

        {/* Recent Check-ins Grid */}
        <View style={styles.recentSection}>
          <Text style={styles.recentTitle}>Os últimos check-ins</Text>
          
          <View style={styles.gridContainer}>
            {POSTS.map((post) => (
              <TouchableOpacity 
                key={post.id} 
                style={styles.gridItem}
                onPress={() => console.log('Open post', post.id)}
              >
                <Image 
                  source={{ uri: post.image! }} 
                  style={styles.gridImage} 
                  resizeMode="cover"
                />
                
                <View style={styles.gridContent}>
                  <Text style={styles.gridPostTitle} numberOfLines={1}>{post.title}</Text>
                  
                  <View style={styles.gridUserRow}>
                     <Image source={{ uri: post.user.avatar }} style={styles.gridUserAvatar} />
                     <View style={{flex: 1}}>
                       <Text style={styles.gridUserName} numberOfLines={1}>{post.user.name}</Text>
                       <Text style={styles.gridGroupName} numberOfLines={1}>{post.group.name}</Text>
                     </View>
                  </View>
                </View>

                <TouchableOpacity style={styles.reactionContainer}>
                   <Text style={styles.reactionText}>🔥 💪</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </View>
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
  scrollContent: {
    paddingBottom: 20,
  },
  
  // Header
  header: {
    paddingHorizontal: 16,
    marginBottom: 24,
    paddingTop: 8,
  },
  headerTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40, 
    height: 40,
    borderRadius: 20,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#333',
  },
  greetingText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  userLevel: {
    color: '#a1a1aa',
    fontSize: 12,
  },
  pageTitle: {
    color: '#fff',
    fontSize: 28,
    lineHeight: 34,
    fontWeight: 'bold',
  },
  
  // Header Icons
  headerIcons: {
    flexDirection: 'row',
  },
  iconBtn: {
    marginLeft: 16,
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 20,
    padding: 8,
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#2563eb', 
    width: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#000',
  },
  badgeText: {
    color: '#fff',
    fontSize: 9,
    fontWeight: 'bold',
  },

  // Cards
  cardsRow: {
    paddingHorizontal: 16,
    flexDirection: 'column', 
    gap: 16,
    marginBottom: 32,
  },
  goalCard: {
    width: '100%',
    borderRadius: 20,
    padding: 16,
    height: 100, 
    justifyContent: 'space-between',
    flexDirection: 'column'
  },
  dailyCard: {
    backgroundColor: '#1c1c1e',
    borderWidth: 1,
    borderColor: '#333',
  },
  weeklyCard: {
    backgroundColor: '#2563eb', // Primary Blue
  },
  goalCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  goalLabel: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 13,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  goalValue: {
    color: '#fff',
    fontSize: 18, 
    fontWeight: 'bold',
    marginTop: 8,
  },

  // Recent Grid
  recentSection: {
    paddingHorizontal: 16,
  },
  recentTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: GAP, 
  },
  gridItem: {
    width: COLUMN_WIDTH,
    backgroundColor: '#09090b', // Zinc-950 (More contrast)
    borderRadius: 16,
    padding: 10,
    borderWidth: 1,
    borderColor: '#27272a', 
    marginBottom: GAP,
  },
  gridImage: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 12,
    marginBottom: 10,
    backgroundColor: '#333',
  },
  gridContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  gridPostTitle: {
    color: '#2563eb', 
    fontWeight: 'bold',
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 8,
  },
  gridUserRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 48, // Espaço para o botão de reação
  },
  gridUserAvatar: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 8,
    backgroundColor: '#333',
  },
  gridUserName: {
    color: '#e4e4e7', // Zinc-200
    fontSize: 11,
    fontWeight: '600',
  },
  gridGroupName: {
    color: '#a1a1aa', // Zinc-400
    fontSize: 10,
  },
  // Reações (Floating Action no card)
  reactionContainer: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: '#27272a', 
    borderRadius: 14,
    paddingHorizontal: 8,
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  reactionText: {
    fontSize: 10,
  },
  statusBadge: {
    // Deprecated
  },
});
