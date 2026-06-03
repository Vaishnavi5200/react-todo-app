// ============================================================
// TodoItem.jsx — Individual Task Card Component
// Place this file at: src/components/TodoItem.jsx
// Renders a single task with toggle, edit, and delete actions.
// ============================================================

import { useState } from "react";

function TodoItem({ task, onDelete, onToggle, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(task.text);
  const [isDeleting, setIsDeleting] = useState(false); // for animation

  // ─── Save edited text ───
  const handleSave = () => {
    if (editValue.trim().length < 2) return; // don't save empty text
    onEdit(task.id, editValue);
    setIsEditing(false);
  };

  const handleEditKeyDown = (e) => {
    if (e.key === "Enter") handleSave();
    if (e.key === "Escape") {
      setEditValue(task.text); // revert
      setIsEditing(false);
    }
  };

  // ─── Animate out before removing ───
  const handleDelete = () => {
    setIsDeleting(true);
    setTimeout(() => onDelete(task.id), 300); // match CSS animation duration
  };

  return (
    <li className={`task-item ${task.completed ? "completed" : ""} ${isDeleting ? "removing" : ""}`}>
      {isEditing ? (
        // ── Edit Mode ──
        <div className="edit-mode">
          <input
            className="edit-input"
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={handleEditKeyDown}
            autoFocus
            maxLength={120}
          />
          <div className="edit-actions">
            <button className="btn-save" onClick={handleSave} title="Save (Enter)">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </button>
            <button
              className="btn-cancel"
              onClick={() => { setEditValue(task.text); setIsEditing(false); }}
              title="Cancel (Esc)"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      ) : (
        // ── View Mode ──
        <div className="view-mode">
          {/* Custom Checkbox */}
          <button
            className={`checkbox ${task.completed ? "checked" : ""}`}
            onClick={() => onToggle(task.id)}
            aria-label={task.completed ? "Mark incomplete" : "Mark complete"}
          >
            {task.completed && (
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            )}
          </button>

          {/* Task Text */}
          <span className="task-text">{task.text}</span>

          {/* Action Buttons */}
          <div className="task-actions">
            <button
              className="btn-edit"
              onClick={() => { setEditValue(task.text); setIsEditing(true); }}
              title="Edit task"
              disabled={task.completed}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
            </button>
            <button className="btn-delete" onClick={handleDelete} title="Delete task">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                <path d="M10 11v6M14 11v6" />
                <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </li>
  );
}

export default TodoItem;
