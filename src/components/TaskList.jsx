import React from "react";

const TaskList = ({ user, onDeleteTask }) => {
  // Ensure that user and tasks exist before rendering
  const tasks = user?.tasks || [];

  if (tasks.length === 0) {
    return <p>No tasks available. Add a task!</p>;
  }

  return (
    <div className="task-list">
      <h3>Your Tasks</h3>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <span>{task.title}</span> - <span>{task.status}</span>
            {/* Delete Button */}
            <button
              onClick={() => onDeleteTask(task.id)}
              style={{ backgroundColor: "red", color: "white" }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
