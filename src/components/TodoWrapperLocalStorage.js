import React, { useState, useEffect } from "react";
import { TodoForm } from "./TodoForm";
import { v4 as uuidv4 } from "uuid";
import { Todo } from "./Todo";
import { EditTodoForm } from "./EditTodoForm";

// Generate a UUID (unused)
uuidv4();

export const TodoWrapperLocalStorage = () => {
  // Initialize 'todos' state with an empty array
  const [todos, setTodos] = useState([]);

  // Load saved todos from local storage when the component mounts
  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(savedTodos);
  }, []);

  // Function to add a new todo
  const addTodo = (todo) => {
    const newTodos = [
      ...todos,
      { id: uuidv4(), task: todo, completed: false, isEditing: false },
    ];
    setTodos(newTodos);

    // Save the updated todos to local storage
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  // Function to toggle the 'completed' status of a todo
  const toggleComplete = (id) => {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(newTodos);

    // Save the updated todos to local storage
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  // Function to delete a todo
  const deleteTodo = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);

    // Save the updated todos to local storage
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  // Function to toggle the 'isEditing' flag of a todo
  const editTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  };

  // Function to edit the task of a todo
  const editTask = (task, id) => {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo
    );
    setTodos(newTodos);

    // Save the updated todos to local storage
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  return (
    <div className="TodoWrapper">
      <h1>TODO APP</h1>
      <TodoForm addTodo={addTodo} />
      {todos.map((todo, index) =>
        todo.isEditing ? (
          // Render the edit form when 'isEditing' is true
          <EditTodoForm editTodo={editTask} task={todo} key={index} />
        ) : (
          // Render the todo item when 'isEditing' is false
          <Todo
            task={todo}
            key={index}
            toggleComplete={toggleComplete}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
          />
        )
      )}
    </div>
  );
};
