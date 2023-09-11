import React, { useState } from "react";
import { Todo } from "./Todo";
import { TodoForm } from "./TodoForm";
import { v4 as uuidv4 } from "uuid";
import { EditTodoForm } from "./EditTodoForm";

export const TodoWrapper = () => {
  // Initialize state to manage todo items
  const [todos, setTodos] = useState([]);

  // Function to add a new todo
  const addTodo = (todo) => {
    // Create a new todo object with a unique ID and default values
    setTodos([
      ...todos,
      { id: uuidv4(), task: todo, completed: false, isEditing: false },
    ]);
  };

  // Function to delete a todo
  const deleteTodo = (id) => setTodos(todos.filter((todo) => todo.id !== id));

  // Function to toggle the completion status of a todo
  const toggleComplete = (id) => {
    // Update the completion status of the selected todo
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Function to toggle the edit mode of a todo
  const editTodo = (id) => {
    // Toggle the edit mode for the selected todo
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  };

  // Function to edit the task of a todo
  const editTask = (task, id) => {
    // Update the task and toggle the edit mode for the selected todo
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo
      )
    );
  };

  return (
    <div className="TodoWrapper">
      <h1>Todo</h1>
      {/* Render the form to add new todos */}
      <TodoForm addTodo={addTodo} />

      {/* Display todos */}
      {todos.map((todo) =>
        todo.isEditing ? (
          // Render an editing form for the selected todo
          <EditTodoForm editTodo={editTask} task={todo} key={todo.id} />
        ) : (
          // Render a todo item
          <Todo
            key={todo.id}
            task={todo}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
            toggleComplete={toggleComplete}
          />
        )
      )}
    </div>
  );
};
