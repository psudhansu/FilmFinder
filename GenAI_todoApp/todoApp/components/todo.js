import React, { useState } from 'react';
import { StyleSheet, View, Text, Button, TextInput, FlatList } from 'react-native';

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [todoTitle, setTodoTitle] = useState('');
  const [todoDescription, setTodoDescription] = useState('');

  const addTodo = () => {
    if (todoTitle && todoDescription) {
      const newTodo = {
        id: new Date().getTime(),
        title: todoTitle,
        description: todoDescription,
        completed: false,
      };
      setTodos([...todos, newTodo]);
      setTodoTitle('');
      setTodoDescription('');
    }
  };

  const markTodoCompleted = id => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, completed: true };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const deleteTodo = id => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Todo App</Text>
      <View style={styles.todoForm}>
        <TextInput
          style={styles.input}
          placeholder="Todo Title"
          value={todoTitle}
          onChangeText={text => setTodoTitle(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Todo Description"
          value={todoDescription}
          onChangeText={text => setTodoDescription(text)}
        />
        <Button title="Add Todo" onPress={addTodo} />
      </View>
      <TodoList todos={todos} markTodoCompleted={markTodoCompleted} deleteTodo={deleteTodo} />
    </View>
  );
};

const TodoList = ({ todos, markTodoCompleted, deleteTodo }) => {
    return (
      <FlatList
        data={todos}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.todoItem}>
            <View>
              <Text style={item.completed ? styles.completed : null}>{item.title}</Text>
              {item.description && <Text>{item.description}</Text>}
            </View>
            <View style={styles.buttonGroup}>
              <Button title="Complete" onPress={() => markTodoCompleted(item.id)} />
              <Button title="Delete" onPress={() => deleteTodo(item.id)} />
            </View>
          </View>
        )}
      />
    );
  };
  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  todoForm: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
  },
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    padding: 10,
  },
  completed: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
});

export default Todos;
