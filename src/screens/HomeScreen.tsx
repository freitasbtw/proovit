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
            {/* Logo and Brand */}
            <View style={styles.brandContainer}>
              <Image 
                source={require('../../assets/logo_proovit_no_bg.png')} 
                style={styles.logo} 
                resizeMode="contain"
              />
              <Text style={styles.brandName}>Proovit</Text>
            </View>

            {/* Profile in the middle */}
            <TouchableOpacity 
              style={styles.centerProfile}
              onPress={() => navigation.navigate('Profile')}
            >
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150' }} 
                style={styles.largeAvatar} 
              />
              <Text style={styles.userLevelCenter}>Level 8</Text>
            </TouchableOpacity>

            {/* Messages Icon */}
            <View style={styles.headerIcons}>
              <TouchableOpacity 
                style={styles.iconBtn}
                onPress={() => navigation.navigate('Direct')}
              >
                <Ionicons name="chatbubble-ellipses-outline" size={24} color="#fff" />
                <View style={styles.badge}><Text style={styles.badgeText}>2</Text></View>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Posts List */}
        <View style={styles.recentSection}>
          <View style={styles.listContainer}>
            {POSTS.map((post) => (
              <TouchableOpacity 
                key={post.id} 
                style={styles.listItem}
                onPress={() => console.log('Open post', post.id)}
              >
                <View style={styles.listHeader}>
                  <Image source={{ uri: post.user.avatar }} style={styles.listUserAvatar} />
                  <View style={styles.listUserText}>
                    <Text style={styles.listUserName}>{post.user.name}</Text>
                    <Text style={styles.listGroupName}>{post.group.name}</Text>
                  </View>
                  <Text style={styles.listTime}>{post.time}</Text>
                </View>

                <Image 
                  source={{ uri: post.image! }} 
                  style={styles.listImage} 
                  resizeMode="cover"
                />
                
                <View style={styles.listFooter}>
                  <Text style={styles.listPostTitle}>{post.title}</Text>
                  <Text style={styles.listDescription} numberOfLines={2}>{post.description}</Text>
                  
                  <View style={styles.listActions}>
                    <View style={styles.listStats}>
                      <Ionicons name="heart-outline" size={20} color="#fff" />
                      <Text style={styles.statsText}>{post.likes}</Text>
                      <Ionicons name="chatbubble-outline" size={20} color="#fff" style={{ marginLeft: 12 }} />
                      <Text style={styles.statsText}>{post.comments}</Text>
                    </View>
                    <View style={styles.reactionPills}>
                       <Text style={styles.reactionText}>🔥 💪</Text>
                    </View>
                  </View>
                </View>
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
    paddingTop: 12,
    marginBottom: 8,
  },
  headerTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flex: 1,
  },
  logo: {
    width: 24,
    height: 24,
  },
  brandName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  centerProfile: {
    alignItems: 'center',
    flex: 1,
  },
  largeAvatar: {
    width: 50, 
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#2563eb',
    marginBottom: 4,
  },
  userLevelCenter: {
    color: '#a1a1aa',
    fontSize: 11,
    fontWeight: '600',
  },
  headerIcons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    flex: 1,
  },
  iconBtn: {
    borderWidth: 1,
    borderColor: '#1c1c1e',
    borderRadius: 20,
    padding: 8,
    backgroundColor: '#000',
  },
  badge: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: '#ef4444', 
    width: 14,
    height: 14,
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#000',
  },
  badgeText: {
    color: '#fff',
    fontSize: 8,
    fontWeight: 'bold',
  },

  // Recent Section (List Format)
  recentSection: {
    marginTop: 16,
  },
  listContainer: {
    paddingHorizontal: 0,
  },
  listItem: {
    backgroundColor: '#000',
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#1c1c1e',
    paddingBottom: 16,
  },
  listHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  listUserAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 10,
  },
  listUserText: {
    flex: 1,
  },
  listUserName: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  listGroupName: {
    color: '#a1a1aa',
    fontSize: 12,
  },
  listTime: {
    color: '#71717a',
    fontSize: 12,
  },
  listImage: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: '#1c1c1e',
  },
  listFooter: {
    paddingHorizontal: 16,
    marginTop: 12,
  },
  listPostTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  listDescription: {
    color: '#d4d4d8',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  listActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  listStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statsText: {
    color: '#a1a1aa',
    fontSize: 13,
    marginLeft: 4,
    fontWeight: '500',
  },
  reactionPills: {
    backgroundColor: '#1c1c1e',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  reactionText: {
    fontSize: 14,
  },
});