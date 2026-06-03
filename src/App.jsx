// ============================================================
// App.jsx — Root Component
// Place this file at: src/App.jsx
// This is the entry point of your To-Do app.
// It manages the global task state and passes data to children.
// ============================================================

import { useState, useEffect } from "react";
import Todo from "./components/Todo";
import "./App.css";

function App() {
  // ─── State: Load tasks from localStorage on first render ───
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem("portfolio-tasks");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // ─── Effect: Save tasks to localStorage whenever they change ───
  useEffect(() => {
    localStorage.setItem("portfolio-tasks", JSON.stringify(tasks));
  }, [tasks]);

  // ─── Add a new task ───
  const addTask = (text) => {
    const newTask = {
      id: Date.now(),            // unique ID using timestamp
      text: text.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTasks((prev) => [newTask, ...prev]); // add to top of list
  };

  // ─── Delete a task by id ───
  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  // ─── Toggle completed status ───
  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // ─── Edit an existing task's text ───
  const editTask = (id, newText) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, text: newText.trim() } : task
      )
    );
  };

  return (
    <div className="app-wrapper">
      <Todo
        tasks={tasks}
        onAdd={addTask}
        onDelete={deleteTask}
        onToggle={toggleTask}
        onEdit={editTask}
      />
    </div>
  );
}

export default App;
