import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, FlatList, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const COLUMN_count = 3;
const IMAGE_SIZE = width / COLUMN_count;

// Mock Data
const PROFILE = {
  username: 'gabriel_dev',
  fullName: 'Gabriel Silva',
  bio: 'Focado em melhorar 1% todo dia.\n📚 Leitura | 💪 Treino | 🧘 Meditação',
  website: 'proovit.app',
  stats: {
    posts: 12,
    followers: 148,
    following: 75,
  },
  posts: [
    { id: '1', image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=300' },
    { id: '2', image: 'https://images.unsplash.com/photo-1552674605-46f5e1f7027c?w=300' },
    { id: '3', image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300' },
    { id: '4', image: null }, // Placeholder
    { id: '5', image: null }, // Placeholder
  ]
};

export function ProfileScreen() {
  const renderHeader = () => (
    <View style={styles.headerContent}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <View style={styles.usernameRow}>
          <Text style={styles.username}>{PROFILE.username}</Text>
          <Ionicons name="chevron-down" size={16} color="#fff" style={{ marginLeft: 4 }} />
        </View>
        <View style={styles.iconRow}>
          <TouchableOpacity style={styles.iconBtn}>
            <Ionicons name="add-circle-outline" size={28} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn}>
            <Ionicons name="menu-outline" size={28} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Profile Stats */}
      <View style={styles.profileStatsRow}>
        <View style={styles.avatarContainer}>
          <Image 
            source={{ uri: 'https://i.pravatar.cc/150?img=12' }} 
            style={styles.avatar} 
          />
          <View style={styles.addAvatarBadge}>
            <Ionicons name="add" size={16} color="#fff" />
          </View>
        </View>
        
        <View style={styles.statsGroup}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{PROFILE.stats.posts}</Text>
            <Text style={styles.statLabel}>posts</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{PROFILE.stats.followers}</Text>
            <Text style={styles.statLabel}>seguidores</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{PROFILE.stats.following}</Text>
            <Text style={styles.statLabel}>seguindo</Text>
          </View>
        </View>
      </View>

      {/* Bio */}
      <View style={styles.bioContainer}>
        <Text style={styles.fullName}>{PROFILE.fullName}</Text>
        <Text style={styles.bioText}>{PROFILE.bio}</Text>
        <Text style={styles.website}>{PROFILE.website}</Text>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtonsRow}>
        <TouchableOpacity style={styles.primaryBtn}>
          <Text style={styles.btnText}>Editar perfil</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.primaryBtn}>
          <Text style={styles.btnText}>Compartilhar perfil</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconBtnSmall}>
          <Ionicons name="person-add-outline" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Highlights (Optional - Placeholder) */}
      <View style={styles.highlightsContainer}>
        <View style={styles.highlightItem}>
          <View style={styles.highlightCircle}>
            <Ionicons name="add" size={30} color="#fff" />
          </View>
          <Text style={styles.highlightLabel}>Novo</Text>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity style={[styles.tabItem, styles.tabActive]}>
          <Ionicons name="grid" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="videocam-outline" size={28} color="#666" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="person-outline" size={26} color="#666" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <FlatList 
        data={PROFILE.posts}
        keyExtractor={item => item.id}
        numColumns={3}
        ListHeaderComponent={renderHeader}
        renderItem={({ item }) => (
          <View style={{ width: IMAGE_SIZE, height: IMAGE_SIZE, padding: 1 }}>
            {item.image ? (
              <Image source={{ uri: item.image }} style={styles.postImage} />
            ) : (
              <View style={styles.placeholderPost}>
                 <Ionicons name="image-outline" size={32} color="#333" />
              </View>
            )}
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  headerContent: {
    paddingBottom: 10,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 44,
  },
  usernameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  username: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  iconRow: {
    flexDirection: 'row',
  },
  iconBtn: {
    marginLeft: 20,
  },
  // Profile Stats
  profileStatsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 12,
  },
  avatarContainer: {
    marginRight: 20,
    position: 'relative',
  },
  avatar: {
    width: 86,
    height: 86,
    borderRadius: 43,
  },
  addAvatarBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#0095f6', // Instagram blue
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#000',
  },
  statsGroup: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginRight: 10,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  statLabel: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '400',
  },
  // Bio
  bioContainer: {
    paddingHorizontal: 16,
    marginTop: 12,
  },
  fullName: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },
  bioText: {
    color: '#fff',
    fontSize: 14,
    lineHeight: 18,
  },
  website: {
    color: '#e0f2fe',
    fontWeight: '600',
  },
  // Action Buttons
  actionButtonsRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginTop: 16,
    gap: 8,
  },
  primaryBtn: {
    flex: 1,
    backgroundColor: '#1c1c1e', // Dark gray
    paddingVertical: 7,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBtnSmall: {
    backgroundColor: '#1c1c1e',
    padding: 7,
    borderRadius: 8,
    width: 34,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 13,
  },
  // Highlights
  highlightsContainer: {
    marginTop: 16,
    paddingHorizontal: 16,
    flexDirection: 'row',
  },
  highlightItem: {
    alignItems: 'center',
    marginRight: 16,
  },
  highlightCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 1,
    borderColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  highlightLabel: {
    color: '#fff',
    fontSize: 12,
  },
  // Tabs
  tabsContainer: {
    flexDirection: 'row',
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#000', // Sutil
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  tabActive: {
    borderBottomColor: '#fff',
  },
  // Grid
  postImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#1c1c1e',
  },
  placeholderPost: {
    width: '100%',
    height: '100%',
    backgroundColor: '#111',
    justifyContent: 'center',
    alignItems: 'center',
  }
});
