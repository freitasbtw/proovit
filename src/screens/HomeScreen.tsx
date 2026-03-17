// src/screens/HomeScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

// Mock Data (Story removed)
const POSTS = [
  {
    id: '1',
    user: { name: 'João Silva', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150' },
    group: { name: 'Clube da Leitura' },
    time: '2h',
    image: null, 
    title: 'Desafio: 100 páginas',
    description: 'Hoje a meta foi batida com sucesso! Li 15 páginas do livro "O Poder do Hábito".',
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
    image: null, 
    title: 'Zero Açúcar',
    description: 'Dia 5 sem açúcar processado. A vontade tá grande, mas sigo firme!',
    status: 'pending',
    likes: 24,
    comments: 5,
  }
];

function FeedPost({ item }: { item: any }) {
  const navigation = useNavigation<any>();
  
  return (
    <View style={styles.postContainer}>
      {/* Header do Post */}
      <View style={styles.postHeader}>
        <View style={styles.postHeaderUser}>
          <Image source={{ uri: item.user.avatar }} style={styles.avatarSmall} />
          <View>
            <Text style={styles.userName}>{item.user.name}</Text>
            <Text style={styles.groupName}>{item.group.name} • {item.time}</Text>
          </View>
        </View>
        <TouchableOpacity>
          <Ionicons name="ellipsis-horizontal" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Conteúdo do Post (Imagem ou Texto) */}
      {item.image ? (
        <Image source={{ uri: item.image }} style={styles.postImage} />
      ) : (
        <View style={styles.postTextContent}>
          <View style={styles.challengeBadge}>
            <Ionicons name={item.status === 'completed' ? 'checkmark-circle' : 'time'} size={16} color={item.status === 'completed' ? '#10b981' : '#f59e0b'} />
            <Text style={[styles.challengeBadgeText, { color: item.status === 'completed' ? '#10b981' : '#f59e0b' }]}>
              {item.title}
            </Text>
          </View>
          <Text style={styles.postDescriptionLarge}>{item.description}</Text>
        </View>
      )}

      {/* Ações (Like, Comment, Share) */}
      <View style={styles.actionRow}>
        <View style={styles.actionLeft}>
          <TouchableOpacity style={styles.actionBtn}>
            <Ionicons name="heart-outline" size={26} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn}>
            <Ionicons name="chatbubble-outline" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn}>
            <Ionicons name="paper-plane-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Camera', { challengeId: item.id })}>
           <View style={[
             styles.checkInBtn, 
             item.status === 'completed' && { backgroundColor: '#10b981' }
           ]}>
             <Text style={styles.checkInText}>
               {item.status === 'completed' ? 'Feito' : 'Check-in'}
             </Text>
           </View>
        </TouchableOpacity>
      </View>

      {/* Rodapé (Likes e Caption se tiver imagem) */}
      <View style={styles.postFooter}>
        <Text style={styles.likesText}>{item.likes} curtidas</Text>
        
        {item.image && (
           <View style={styles.captionContainer}>
             <Text style={styles.captionUser}>{item.user.name} </Text>
             <Text style={styles.captionText}>{item.description}</Text>
           </View>
        )}
        
        <Text style={styles.viewComments}>Ver todos os {item.comments} comentários</Text>
      </View>
    </View>
  );
}

export function HomeScreen() {
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header Principal */}
      <View style={styles.header}>
        <Text style={styles.logo}>Proovit</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconBtn}>
            <Ionicons name="heart-outline" size={26} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.iconBtn}
            onPress={() => navigation.navigate('Direct')}
          >
            <Ionicons name="chatbubble-ellipses-outline" size={26} color="#fff" />
            <View style={styles.badge}><Text style={styles.badgeText}>2</Text></View>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.feed}>
          {POSTS.map(post => <FeedPost key={post.id} item={post} />)}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 50,
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 24,
    color: '#3b82f6', // Azul highlight
    letterSpacing: -1,
  },
  headerIcons: {
    flexDirection: 'row',
  },
  iconBtn: {
    marginLeft: 20,
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#2563eb', // Azul highlight
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
  
  // Feed
  feed: {
    paddingBottom: 20,
    marginTop: 10,
  },
  postContainer: {
    marginBottom: 20,
  },

  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  postHeaderUser: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarSmall: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 10,
    backgroundColor: '#333',
  },
  userName: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  groupName: {
    color: '#a1a1aa',
    fontSize: 12,
  },
  postImage: {
    width: '100%',
    height: 400,
    backgroundColor: '#1c1c1e',
  },
  postTextContent: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: '#111',
    minHeight: 200,
    justifyContent: 'center',
  },
  postDescriptionLarge: {
    color: '#fff',
    fontSize: 18,
    lineHeight: 26,
    marginTop: 10,
  },
  challengeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  challengeBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 6,
  },
  
  // Actions
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  actionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionBtn: {
    marginRight: 16,
  },
  checkInBtn: {
    backgroundColor: '#2563eb', // Azul highlight
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 6,
  },
  checkInText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },

  // Footer
  postFooter: {
    paddingHorizontal: 12,
  },
  likesText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
    marginBottom: 4,
  },
  captionContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 4,
  },
  captionUser: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  captionText: {
    color: '#fff',
    fontWeight: '400',
  },
  viewComments: {
    color: '#71717a',
    fontSize: 14,
    marginTop: 2,
  },
});
