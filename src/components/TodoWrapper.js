import React, { useState } from "react";
import { Todo } from "./Todo";
import { TodoForm } from "./TodoForm";
import { v4 as uuidv4 } from "uuid";
import { EditTodoForm } from "./EditTodoForm";
import { IoIosSearch } from "react-icons/io"; // Importing the search icon

export const TodoWrapper = () => {
  const [todos, setTodos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const addTodo = (todo) => {
    setTodos([
      ...todos,
      { id: uuidv4(), task: todo, completed: false, isEditing: false },
    ]);
  };

  const deleteTodo = (id) => setTodos(todos.filter((todo) => todo.id !== id));

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const editTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  };

  const editTask = (task, id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo
      )
    );
  };

  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
  };

  const handleRatingChange = (e) => {
    setRating(parseInt(e.target.value));
  };

  const submitFeedback = () => {
    // Handle submitting feedback and rating
    // For example:
    console.log("Feedback:", feedback);
    console.log("Rating:", rating);
    // Reset feedback and rating after submission
    setFeedback("");
    setRating(0);
    setShowFeedback(false); // Hide the feedback section after submission
    setSubmitted(true); // Mark feedback as submitted
  };

  const filteredTodos = todos.filter((todo) =>
    todo.task.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="TodoWrapper">
      <div className="header">
        <h1>Get Things Done!</h1>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="todo-btn"
          />
          <IoIosSearch className="search-icon" /> {/* Search icon */}
        </div>
      </div>
      {submitted && rating < 3 && (
        <>
          <p style={{ color: "white", fontWeight: "bold" }}>Thank you for your feedback, we will improve!</p>
          <button onClick={() => setSubmitted(false)} className="todo-btn">Back</button>
        </>
      )}
      {submitted && rating >= 3 && (
        <>
          <p style={{ color: "white", fontWeight: "bold" }}>Thank you for your feedback!</p>
          <button onClick={() => setSubmitted(false)} className="todo-btn">Back</button>
        </>
      )}
      {!showFeedback && !submitted && (
        <TodoForm addTodo={addTodo} />
      )}
      {!showFeedback && !submitted && filteredTodos.map((todo) => (
        <Todo
          key={todo.id}
          task={todo}
          deleteTodo={deleteTodo}
          editTodo={editTodo}
          toggleComplete={toggleComplete}
        />
      ))}
      {showFeedback && !submitted && (
        <div className="feedback-section">
          <h2 style={{ color: "white", fontWeight: "bold" }}>Feedback</h2>
          <textarea
            value={feedback}
            onChange={handleFeedbackChange}
            placeholder="Enter your feedback..."
            className="todo-btn"
          />
          <h2 style={{ color: "white", fontWeight: "bold" }}>Rating</h2>
          <select value={rating} onChange={handleRatingChange} className="todo-btn">
            <option value={0}>Select rating...</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
          <button onClick={submitFeedback} className="todo-btn2">Submit Feedback</button>
        </div>
      )}
      {showFeedback && !submitted && (
        <button onClick={() => setShowFeedback(false)} className="todo-btn">Back</button>
      )}
      {!showFeedback && !submitted && (
        <button onClick={() => setShowFeedback(true)} className="todo-btn">Feedback</button>
      )}
    </div>
  );
};
