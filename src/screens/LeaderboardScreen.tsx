import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

type MembershipType = 'open' | 'approval' | 'invite';
type JoinStatus = 'none' | 'pending' | 'joined';

interface GroupResult {
  id: string;
  name: string;
  description: string;
  members: number;
  image: string;
  type: MembershipType;
  status: JoinStatus;
}

const INITIAL_RESULTS: GroupResult[] = [
  {
    id: '1',
    name: 'Clube da Leitura',
    description: 'Lendo 1 livro por mês juntos.',
    members: 1240,
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=150&q=80',
    type: 'open',
    status: 'none',
  },
  {
    id: '2',
    name: 'Gym Rats',
    description: 'Foco total no treino e dieta.',
    members: 856,
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=150&q=80',
    type: 'open',
    status: 'joined',
  },
  {
    id: '3',
    name: 'No Sugar',
    description: 'Desafio 30 dias sem açúcar.',
    members: 342,
    image: 'https://images.unsplash.com/photo-1621262602755-d3dc3a3cb038?w=150&q=80',
    type: 'approval',
    status: 'none',
  },
  {
    id: '4',
    name: 'Elite Runners',
    description: 'Grupo fechado para maratonistas.',
    members: 50,
    image: 'https://images.unsplash.com/photo-1552674605-46f5e1f7027c?w=150&q=80',
    type: 'invite',
    status: 'none',
  },
];

export function LeaderboardScreen() {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState<GroupResult[]>(INITIAL_RESULTS);

  const handleAction = (id: string, type: MembershipType) => {
    setResults(prev => prev.map(group => {
      if (group.id !== id) return group;
      
      let newStatus: JoinStatus = group.status;
      
      if (group.status === 'none') {
        if (type === 'open') newStatus = 'joined';
        if (type === 'approval') newStatus = 'pending';
      }
      
      return { ...group, status: newStatus };
    }));
  };

  const filteredResults = results.filter(r => 
    r.name.toLowerCase().includes(search.toLowerCase())
  );

  const renderItem = ({ item }: { item: GroupResult }) => {
    let btnText = 'Entrar';
    let btnBg = '#2563eb';
    let btnColor = '#fff';
    let disabled = false;

    if (item.status === 'joined') {
      btnText = 'Participando';
      btnBg = '#1c1c1e';
      btnColor = '#fff'; // ou verde? não, padrão insta é cinza
      disabled = true;
    } else if (item.status === 'pending') {
      btnText = 'Pendente';
      btnBg = '#1c1c1e';
      btnColor = '#fbbf24';
      disabled = true;
    } else if (item.type === 'invite') {
      btnText = 'Privado';
      btnBg = '#1c1c1e';
      btnColor = '#666';
      disabled = true;
    } else if (item.type === 'approval') {
      btnText = 'Pedir para entrar';
    }

    return (
      <View style={styles.resultItem}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={styles.info}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.desc}>{item.description}</Text>
          <Text style={styles.members}>{item.members} membros</Text>
        </View>
        <TouchableOpacity 
          style={[styles.btn, { backgroundColor: btnBg }]}
          disabled={disabled}
          onPress={() => handleAction(item.id, item.type)}
        >
          <Text style={[styles.btnText, { color: btnColor }]}>{btnText}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
        <TextInput 
          style={styles.input}
          placeholder="Buscar desafios..."
          placeholderTextColor="#666"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <FlatList 
        data={filteredResults}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  searchContainer: {
    margin: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1c1c1e',
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 44,
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
  },
  list: {
    paddingHorizontal: 16,
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#333',
    marginRight: 12,
  },
  info: {
    flex: 1,
    marginRight: 8,
  },
  name: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  desc: {
    color: '#aaa',
    fontSize: 13,
    marginTop: 2,
  },
  members: {
    color: '#666',
    fontSize: 12,
    marginTop: 2,
  },
  btn: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    minWidth: 90,
    alignItems: 'center',
  },
  btnText: {
    fontSize: 12,
    fontWeight: 'bold',
  }
});