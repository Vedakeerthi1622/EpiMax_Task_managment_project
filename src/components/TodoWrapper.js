import React, { useState, useEffect } from "react";
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
  const [filteredTodos, setFilteredTodos] = useState([]);

  useEffect(() => {
    // Filter todos based on the search term
    const filtered = todos.filter(todo =>
      todo.task.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTodos(filtered);
  }, [todos, searchTerm]);

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
    console.log("Feedback:", feedback);
    console.log("Rating:", rating);
    setFeedback("");
    setRating(0);
    setShowFeedback(false);
    setSubmitted(true);
  };

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
        <div>
          <TodoForm addTodo={addTodo} />
          {/* Display filtered todos */}
          {filteredTodos.map((todo) =>
            todo.isEditing ? (
              <EditTodoForm key={todo.id} editTodo={editTask} task={todo} />
            ) : (
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
      </div>
      {submitted && (
        <div className="feedback-section">
          <p style={{ color: "white", fontWeight: "bold" }}>
            Thank you for your feedback
          </p>
          <button onClick={() => setSubmitted(false)} className="todo-btn">
            Back
          </button>
        </div>
      )}
      {!submitted && showFeedback && (
        <div className="feedback-section">
          <h2 style={{ color: "white", fontWeight: "bold" }}>Feedback</h2>
          <textarea
            value={feedback}
            onChange={handleFeedbackChange}
            placeholder="Enter your feedback..."
            className="todo-btn"
          />
          <h2 style={{ color: "white", fontWeight: "bold" }}>Rating</h2>
          <select
            value={rating}
            onChange={handleRatingChange}
            className="todo-btn"
          >
            <option value={0}>Select rating...</option>
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
          <button onClick={submitFeedback} className="todo-btn2">
            Submit Feedback
          </button>
          <button onClick={() => setShowFeedback(false)} className="todo-btn">
            Back
          </button>
        </div>
      )}
      {!showFeedback && !submitted && (
        <button onClick={() => setShowFeedback(true)} className="todo-btn">
          Feedback
        </button>
      )}
    </div>
  );
};
