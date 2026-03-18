import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, FlatList, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useNavigation, useRoute, NavigationProp } from '@react-navigation/native';

export type RootStackParamList = {
  GroupDetails: { groupId: string, name: string };
};

const SCREEN_WIDTH = Dimensions.get('window').width;

const CHECKINS = [
  { id: '1', title: 'Treininho cedo', user: 'Agatha L.', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=300&q=80', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80' },
  { id: '2', title: 'buscando o balde...', user: 'Lucas M.', image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=300&q=80', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80' },
];

const FEED = [
  { id: '1', title: 'Galera, pega esse receitinha daora!', author: 'Thales S.', time: '12h30', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=100&q=80' },
  { id: '2', title: 'Promoção de corda profissional lá na Centauro!', author: 'Ayrton G.', time: '07h47', image: 'https://images.unsplash.com/photo-1515524738708-327c1b1836f3?w=100&q=80' },
];

export function GroupDetailsScreen() {
  const navigation = useNavigation<NavigationProp<any>>();
  const route = useRoute<any>();
  const [layoutMode, setLayoutMode] = useState<'grid' | 'list'>('grid');

  const { name = 'Grupo do trampo' } = route.params || {};

  const renderCheckinGridItem = ({ item }: { item: typeof CHECKINS[0] }) => (
    <View style={styles.gridCard}>
      <Image source={{ uri: item.image }} style={styles.gridImage} />
      <View style={styles.gridOverlay}>
        <View style={styles.gridUserInfo}>
          <Image source={{ uri: item.avatar }} style={styles.gridAvatar} />
          <View>
            <Text style={styles.gridTitle} numberOfLines={1}>{item.title}</Text>
            <Text style={styles.gridUser} numberOfLines={1}>{item.user}</Text>
          </View>
        </View>
      </View>
    </View>
  );

  const renderCheckinListItem = ({ item }: { item: typeof CHECKINS[0] }) => (
    <View style={styles.listCard}>
      <Image source={{ uri: item.image }} style={styles.listImage} />
      <View style={styles.listInfo}>
        <Text style={styles.listTitle}>{item.title}</Text>
        <View style={styles.listUserInfo}>
          <Image source={{ uri: item.avatar }} style={styles.listAvatar} />
          <Text style={styles.listUser}>{item.user}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
            <Ionicons name="chevron-back" size={28} color="#fff" />
          </TouchableOpacity>
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="notifications-outline" size={24} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="settings-outline" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Group Info */}
        <View style={styles.groupInfoContainer}>
          <Text style={styles.groupTitle}>{name}</Text>
          <Text style={styles.groupSubtitle}>Grupo criado em 2022</Text>
        </View>

        {/* Profiles */}
        <View style={styles.profilesSection}>
          <View style={styles.profileColumn}>
            <Text style={[styles.profileLabel, { color: '#ff3b30' }]}>Você</Text>
            <View style={styles.profileRow}>
              <Image source={{ uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80' }} style={styles.profileAvatar} />
              <View>
                <Text style={styles.profileName}>Matheus</Text>
                <Text style={styles.profileStats}>12 check-ins</Text>
              </View>
            </View>
          </View>

          <View style={styles.profileColumn}>
            <Text style={[styles.profileLabel, { color: '#ff3b30' }]}>Líder</Text>
            <View style={styles.profileRow}>
              <Image source={{ uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80' }} style={styles.profileAvatar} />
              <View>
                <Text style={styles.profileName}>Matheus</Text>
                <Text style={styles.profileStats}>12 check-ins</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Check-ins Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Check-ins do grupo</Text>
          <TouchableOpacity>
            <Text style={styles.seeMore}>Ver mais</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.subHeaderRow}>
          <Text style={styles.subHeaderTitle}>Hoje</Text>
          <View style={styles.layoutToggles}>
            <TouchableOpacity onPress={() => setLayoutMode('grid')} style={styles.toggleBtn}>
              <Feather name="grid" size={20} color={layoutMode === 'grid' ? '#ff3b30' : '#666'} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setLayoutMode('list')} style={[styles.toggleBtn, { marginLeft: 12 }]}>
              <Feather name="list" size={20} color={layoutMode === 'list' ? '#ff3b30' : '#666'} />
            </TouchableOpacity>
          </View>
        </View>

        {layoutMode === 'grid' ? (
          <FlatList
            key="grid-list"
            data={CHECKINS}            keyExtractor={item => item.id}
            renderItem={renderCheckinGridItem}
            numColumns={2}
            scrollEnabled={false}
            columnWrapperStyle={styles.gridRow}
          />
        ) : (
          <FlatList
            key="list-list"
            data={CHECKINS}            keyExtractor={item => item.id}
            renderItem={renderCheckinListItem}
            scrollEnabled={false}
          />
        )}

        {/* Feed Section */}
        <View style={[styles.sectionHeader, { marginTop: 32 }]}>
          <Text style={styles.sectionTitle}>Feed do grupo</Text>
          <TouchableOpacity>
            <Text style={styles.seeMore}>Ver mais</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.feedContainer}>
          {FEED.map(item => (
            <TouchableOpacity key={item.id} style={styles.feedItem}>
              <Image source={{ uri: item.image }} style={styles.feedImage} />
              <View style={styles.feedInfo}>
                <Text style={styles.feedTitle} numberOfLines={1}>{item.title}</Text>
                <View style={styles.feedMeta}>
                  <Text style={styles.feedAuthor}>Post criado por {item.author}</Text>
                  <Text style={styles.feedTime}>{item.time}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  headerRight: {
    flexDirection: 'row',
  },
  iconButton: {
    padding: 8,
    marginLeft: 8,
  },
  groupInfoContainer: {
    paddingHorizontal: 24,
    marginTop: 10,
  },
  groupTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  groupSubtitle: {
    fontSize: 14,
    color: '#888',
    marginTop: 4,
  },
  profilesSection: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    marginTop: 32,
    justifyContent: 'flex-start',
  },
  profileColumn: {
    marginRight: 40,
  },
  profileLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  profileName: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  profileStats: {
    color: '#aaa',
    fontSize: 12,
    marginTop: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginTop: 40,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  seeMore: {
    color: '#ff3b30',
    fontSize: 14,
    fontWeight: '500',
  },
  subHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  subHeaderTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  layoutToggles: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  toggleBtn: {
    padding: 4,
  },
  gridRow: {
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },
  gridCard: {
    width: (SCREEN_WIDTH - 48 - 16) / 2,
    height: 200,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#222',
  },
  gridImage: {
    width: '100%',
    height: '100%',
  },
  gridOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 12,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  gridUserInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  gridAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  gridTitle: {
    color: '#ff3b30',
    fontSize: 12,
    fontWeight: '600',
  },
  gridUser: {
    color: '#fff',
    fontSize: 10,
    marginTop: 2,
  },
  listCard: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  listImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginRight: 16,
  },
  listInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  listTitle: {
    color: '#ff3b30',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  listUserInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 8,
  },
  listUser: {
    color: '#fff',
    fontSize: 14,
  },
  feedContainer: {
    paddingHorizontal: 24,
  },
  feedItem: {
    flexDirection: 'row',
    backgroundColor: '#161618',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
  },
  feedImage: {
    width: 48,
    height: 48,
    borderRadius: 8,
    marginRight: 16,
  },
  feedInfo: {
    flex: 1,
  },
  feedTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 6,
  },
  feedMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  feedAuthor: {
    color: '#888',
    fontSize: 12,
  },
  feedTime: {
    color: '#888',
    fontSize: 12,
  },
});
