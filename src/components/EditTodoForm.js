import React, { useState } from "react";

// Define a functional component called EditTodoForm
export const EditTodoForm = ({ editTodo, task }) => {
  // Initialize a state variable 'value' with the initial value of the task
  const [value, setValue] = useState(task.task);

  // Define a function to handle form submission
  const handleSubmit = (e) => {
    // Prevent the default form submission behavior
    e.preventDefault();

    // Call the 'editTodo' function with the updated 'value' and the task's 'id'
    editTodo(value, task.id);
  };

  // Render a form with an input field and a submit button
  return (
    <form onSubmit={handleSubmit} className="TodoForm">
      {/* Input field to edit the task */}
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="todo-input"
        placeholder="Update task"
      />
      {/* Submit button */}
      <button type="submit" className="todo-btn">
        Update Task
      </button>
    </form>
  );
};
