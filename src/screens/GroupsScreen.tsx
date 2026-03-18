import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/RootNavigator';

const MY_GROUPS = [
  { id: '1', name: 'Clube da Leitura', members: 12, image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=150&q=80' },
  { id: '2', name: 'Gym Rats', members: 45, image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=150&q=80' },
  { id: '3', name: 'No Sugar', members: 8, image: 'https://images.unsplash.com/photo-1621262602755-d3dc3a3cb038?w=150&q=80' },
];

export function GroupsScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerTitle}>Meus Grupos</Text>
      
      <FlatList 
        data={MY_GROUPS}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.groupItem}
            onPress={() => navigation.navigate('GroupDetails', { groupId: item.id, name: item.name })}
          >
            <Image source={{ uri: item.image }} style={styles.groupImage} />
            <View style={styles.groupInfo}>
              <Text style={styles.groupName}>{item.name}</Text>
              <Text style={styles.groupMembers}>{item.members} membros</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#666" />
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
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    margin: 20,
  },
  list: {
    paddingHorizontal: 20,
  },
  groupItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  groupImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
    backgroundColor: '#333',
  },
  groupInfo: {
    flex: 1,
  },
  groupName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  groupMembers: {
    color: '#888',
    fontSize: 14,
    marginTop: 2,
  },
});
