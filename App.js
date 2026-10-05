import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, SafeAreaView, Keyboard } from 'react-native';

export default function App() {
  const [task, setTask] = useState('');
  const [taskList, setTaskList] = useState([]);

  // Функция добавления задачи
  const handleAddTask = () => {
    if (task.trim().length > 0) {
      setTaskList([...taskList, { key: Date.now().toString(), value: task }]);
      setTask('');
      Keyboard.dismiss();
    }
  };

  // Функция удаления задачи
  const handleDeleteTask = (key) => {
    setTaskList(taskList.filter((item) => item.key !== key));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Мои задачи</Text>
      
      {/* Поле ввода */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Что нужно сделать?"
          value={task}
          onChangeText={(text) => setTask(text)}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Список задач */}
      <FlatList
        data={taskList}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <Text style={styles.taskText}>{item.value}</Text>
            <TouchableOpacity onPress={() => handleDeleteTask(item.key)}>
              <Text style={styles.deleteText}>Удалить</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item.key}
      />
    </SafeAreaView>
  );
}

// Стили приложения
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    marginRight: 10,
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#FFCC00', // Желтый цвет в стиле Яндекса :)
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  addButtonText: {
    fontSize: 30,
    color: '#000',
    fontWeight: 'bold',
    marginTop: -4,
  },
  taskItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    borderLeftWidth: 5,
    borderLeftColor: '#FFCC00',
  },
  taskText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  deleteText: {
    color: '#ff4444',
    fontWeight: 'bold',
  },
});
