// ============================================================
// Todo.jsx — Main Container Component
// Place this file at: src/components/Todo.jsx
// Handles the input field, filter tabs, stats, and task list.
// ============================================================

import { useState } from "react";
import TodoItem from "./TodoItem";

function Todo({ tasks, onAdd, onDelete, onToggle, onEdit }) {
  const [inputValue, setInputValue] = useState("");
  const [filter, setFilter] = useState("all"); // "all" | "active" | "completed"
  const [error, setError] = useState("");

  // ─── Stats ───
  const totalCount = tasks.length;
  const completedCount = tasks.filter((t) => t.completed).length;
  const activeCount = totalCount - completedCount;

  // ─── Handle form submission ───
  const handleAdd = () => {
    if (!inputValue.trim()) {
      setError("Please enter a task.");
      setTimeout(() => setError(""), 2500);
      return;
    }
    if (inputValue.trim().length < 2) {
      setError("Task must be at least 2 characters.");
      setTimeout(() => setError(""), 2500);
      return;
    }
    onAdd(inputValue);
    setInputValue("");
    setError("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleAdd();
  };

  // ─── Filter tasks based on active tab ───
  const visibleTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  return (
    <div className="todo-container">
      {/* ── Header ── */}
      <header className="todo-header">
        <div className="header-icon">✦</div>
        <h1 className="todo-title">My Tasks</h1>
        <p className="todo-subtitle">Stay focused. Ship things.</p>
      </header>

      {/* ── Stats Row ── */}
      <div className="stats-row">
        <div className="stat-card">
          <span className="stat-number">{totalCount}</span>
          <span className="stat-label">Total</span>
        </div>
        <div className="stat-card accent">
          <span className="stat-number">{activeCount}</span>
          <span className="stat-label">Active</span>
        </div>
        <div className="stat-card success">
          <span className="stat-number">{completedCount}</span>
          <span className="stat-label">Done</span>
        </div>
      </div>

      {/* ── Input Area ── */}
      <div className="input-area">
        <div className={`input-wrapper ${error ? "shake" : ""}`}>
          <input
            className="task-input"
            type="text"
            placeholder="Add a new task..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            maxLength={120}
          />
          <button className="add-btn" onClick={handleAdd} aria-label="Add task">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </button>
        </div>
        {error && <p className="error-msg">{error}</p>}
      </div>

      {/* ── Filter Tabs ── */}
      <div className="filter-tabs">
        {["all", "active", "completed"].map((tab) => (
          <button
            key={tab}
            className={`filter-tab ${filter === tab ? "active" : ""}`}
            onClick={() => setFilter(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
            <span className="tab-count">
              {tab === "all" ? totalCount : tab === "active" ? activeCount : completedCount}
            </span>
          </button>
        ))}
      </div>

      {/* ── Task List ── */}
      <ul className="task-list">
        {visibleTasks.length === 0 ? (
          <li className="empty-state">
            <span className="empty-icon">
              {filter === "completed" ? "🎉" : "📋"}
            </span>
            <p>
              {filter === "completed"
                ? "No completed tasks yet."
                : filter === "active"
                ? "No active tasks. Great job!"
                : "Add your first task above!"}
            </p>
          </li>
        ) : (
          visibleTasks.map((task) => (
            <TodoItem
              key={task.id}
              task={task}
              onDelete={onDelete}
              onToggle={onToggle}
              onEdit={onEdit}
            />
          ))
        )}
      </ul>

      {/* ── Footer ── */}
      {totalCount > 0 && (
        <footer className="todo-footer">
          {completedCount > 0 && (
            <div className="progress-bar-wrap">
              <div
                className="progress-bar-fill"
                style={{ width: `${Math.round((completedCount / totalCount) * 100)}%` }}
              />
            </div>
          )}
          <p className="footer-text">
            {completedCount === totalCount && totalCount > 0
              ? "🎉 All tasks complete!"
              : `${Math.round((completedCount / totalCount) * 100)}% complete`}
          </p>
        </footer>
      )}
    </div>
  );
}

export default Todo;
