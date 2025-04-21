import React, { useState } from "react";

const TaskForm = ({ user, setUser }) => {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskStatus, setTaskStatus] = useState("pending");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check for duplicate task titles
    if (user.tasks.some((task) => task.title === taskTitle.trim())) {
      setErrorMessage("This task already exists!");
      return;
    }

    if (taskTitle.trim()) {
      const newTask = {
        id: Date.now(), // Unique ID based on timestamp
        title: taskTitle,
        status: taskStatus,
      };

      // Update the tasks array for the user
      const updatedUser = {
        ...user,
        tasks: [...user.tasks, newTask], // Add the new task to the tasks array
      };

      // Update the user state with the new task
      setUser(updatedUser);

      // Clear the form input after submitting
      setTaskTitle("");
      setTaskStatus("pending");
      setErrorMessage(""); // Reset error message
    }
  };

  return (
    <div className="task-form">
      <h3>Create Task</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Task title"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
        />
        <select
          value={taskStatus}
          onChange={(e) => setTaskStatus(e.target.value)}
        >
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
        <button type="submit">Add Task</button>
      </form>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </div>
  );
};

export default TaskForm;
