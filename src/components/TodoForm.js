import React, { useState } from "react";

// Define a functional component called TodoForm
export const TodoForm = ({ addTodo }) => {
  // Initialize a state variable 'value' with an empty string
  const [value, setValue] = useState("");

  // Define a function to handle form submission
  const handleSubmit = (e) => {
    // Prevent the default form submission behavior
    e.preventDefault();

    // Check if 'value' is not empty
    if (value) {
      // Call the 'addTodo' function with the current 'value' as a parameter
      addTodo(value);

      // Clear the input field by setting 'value' back to an empty string
      setValue("");
    }
  };

  // Render a form with an input field and a submit button
  return (
    <form onSubmit={handleSubmit} className="TodoForm">
      {/* Input field to enter a new task */}
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="todo-input"
        placeholder="Enter Task Here"
      />
      {/* Submit button */}
      <button type="submit" className="todo-btn">
        Add Task
      </button>
    </form>
  );
};
