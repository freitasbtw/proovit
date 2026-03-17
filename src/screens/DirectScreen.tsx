import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const GROUP_CHATS = [
  { id: '1', name: 'Clube da Leitura', lastMessage: 'João: Alguém já leu o cap 3?', time: '10:30', image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=150&q=80' },
  { id: '2', name: 'Gym Rats', lastMessage: 'Maria: O treino de hoje tá pago!', time: '09:15', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=150&q=80' },
];

const DIRECT_MSGS = [
  { id: '1', name: 'João Silva', lastMessage: 'Beleza, combinado.', time: 'Ontem', image: 'https://i.pravatar.cc/150?img=68' },
  { id: '2', name: 'Maria Souza', lastMessage: 'Você viu o novo desafio?', time: 'Segunda', image: 'https://i.pravatar.cc/150?img=44' },
];

export function DirectScreen() {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState<'groups' | 'directs'>('groups');

  const data = activeTab === 'groups' ? GROUP_CHATS : DIRECT_MSGS;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Mensagens</Text>
        <TouchableOpacity>
           <Ionicons name="create-outline" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Toggle Segment Control */}
      <View style={styles.segmentContainer}>
        <TouchableOpacity 
          style={[styles.segmentBtn, activeTab === 'groups' && styles.segmentBtnActive]}
          onPress={() => setActiveTab('groups')}
        >
          <Text style={[styles.segmentText, activeTab === 'groups' && styles.segmentTextActive]}>Grupos</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.segmentBtn, activeTab === 'directs' && styles.segmentBtnActive]}
          onPress={() => setActiveTab('directs')}
        >
          <Text style={[styles.segmentText, activeTab === 'directs' && styles.segmentTextActive]}>Directs</Text>
        </TouchableOpacity>
      </View>

      {/* List */}
      <FlatList 
        data={data}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.chatItem}>
            <Image source={{ uri: item.image }} style={styles.chatImage} />
            <View style={styles.chatInfo}>
              <View style={styles.chatHeader}>
                <Text style={styles.chatName}>{item.name}</Text>
                <Text style={styles.chatTime}>{item.time}</Text>
              </View>
              <Text style={styles.lastMessage} numberOfLines={1}>{item.lastMessage}</Text>
            </View>
          </TouchableOpacity>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1c1c1e',
  },
  backBtn: {
    paddingRight: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  segmentContainer: {
    flexDirection: 'row',
    margin: 16,
    backgroundColor: '#1c1c1e',
    borderRadius: 8,
    padding: 4,
  },
  segmentBtn: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 6,
  },
  segmentBtnActive: {
    backgroundColor: '#333',
  },
  segmentText: {
    color: '#888',
    fontWeight: '600',
  },
  segmentTextActive: {
    color: '#fff',
  },
  list: {
    paddingHorizontal: 16,
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  chatImage: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: 16,
    backgroundColor: '#333',
  },
  chatInfo: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  chatName: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  chatTime: {
    color: '#666',
    fontSize: 12,
  },
  lastMessage: {
    color: '#888',
    fontSize: 14,
  },
});
