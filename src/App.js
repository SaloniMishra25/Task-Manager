import React, { useState } from "react";
import AuthForm from "./components/AuthForm";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import "./index.css";

const App = () => {
  const [user, setUser] = useState(null);

  const handleAuth = (userData) => {
    setUser({ ...userData, tasks: [] });
  };

  const handleLogout = () => setUser(null);

  // Handle deleting a task
  const handleDeleteTask = (taskId) => {
    const updatedTasks = user.tasks.filter((task) => task.id !== taskId);
    setUser({ ...user, tasks: updatedTasks });
  };

  return (
    <div className="app">
      <div className="container">
        {user ? (
          <>
            <h2>Welcome, {user.username}!</h2>
            <TaskForm user={user} setUser={setUser} />
            <TaskList user={user} onDeleteTask={handleDeleteTask} />
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <AuthForm onAuth={handleAuth} />
        )}
      </div>
    </div>
  );
};

export default App;
