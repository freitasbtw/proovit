import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const TASKS = [
  {
    id: 'g1',
    group: 'Clube da Leitura',
    items: [
      { id: '1', title: 'Ler 10 páginas', completed: true },
    ]
  },
  {
    id: 'g2',
    group: 'Vida Saudável',
    items: [
      { id: '2', title: 'Beber 2L de água', completed: false },
      { id: '3', title: 'Treino de 30min', completed: false },
    ]
  },
  {
    id: 'g3',
    group: 'Mindfulness',
    items: [
      { id: '4', title: 'Meditar', completed: true },
    ]
  }
];

export function ChecklistScreen() {
  const [tasks, setTasks] = useState(TASKS);

  const toggleTask = (groupId: string, taskId: string) => {
    setTasks(prev => prev.map(group => {
      if (group.id !== groupId) return group;
      return {
        ...group,
        items: group.items.map(task => 
          task.id === taskId ? { ...task, completed: !task.completed } : task
        )
      };
    }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerTitle}>Checklist Diário</Text>
      
      <ScrollView contentContainerStyle={styles.content}>
        {tasks.map(group => (
          <View key={group.id} style={styles.groupSection}>
            <Text style={styles.groupTitle}>{group.group}</Text>
            <View style={styles.groupCard}>
              {group.items.map((task, index) => (
                <View key={task.id}>
                  <TouchableOpacity 
                    style={styles.taskItem}
                    onPress={() => toggleTask(group.id, task.id)}
                  >
                    <View style={[styles.checkbox, task.completed && styles.checked]}>
                      {task.completed && <Ionicons name="checkmark" size={16} color="#fff" />}
                    </View>
                    <Text style={[styles.taskText, task.completed && styles.completedText]}>
                      {task.title}
                    </Text>
                  </TouchableOpacity>
                  {index < group.items.length - 1 && <View style={styles.divider} />}
                </View>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
      
      <TouchableOpacity style={styles.fab}>
        <Ionicons name="add" size={32} color="#fff" />
      </TouchableOpacity>
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
  content: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  groupSection: {
    marginBottom: 24,
  },
  groupTitle: {
    color: '#6b7280',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  groupCard: {
    backgroundColor: '#111',
    borderRadius: 16,
    padding: 16,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#333',
    marginRight: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checked: {
    backgroundColor: '#2563eb', // Blue highlight
    borderColor: '#2563eb',
  },
  taskText: {
    color: '#fff',
    fontSize: 16,
  },
  completedText: {
    color: '#666',
    textDecorationLine: 'line-through',
  },
  divider: {
    height: 1,
    backgroundColor: '#222',
    marginVertical: 12,
    marginLeft: 40, // Indent to align with text
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#2563eb',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  }
});
