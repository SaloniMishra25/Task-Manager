import React, { useState } from "react";

const AuthForm = ({ onAuth }) => {
  const [showSignUp, setShowSignUp] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  // Helper to get/set users in localStorage
  const loadUsers = () =>
    JSON.parse(localStorage.getItem("users") || "[]");
  const saveUsers = (users) =>
    localStorage.setItem("users", JSON.stringify(users));

  const handleSignUp = (e) => {
    e.preventDefault();
    if (!username || !password || !confirmPassword) {
      return setError("All fields are required.");
    }
    if (password !== confirmPassword) {
      return setError("Passwords don’t match.");
    }
    const users = loadUsers();
    if (users.find((u) => u.username === username)) {
      return setError("Username already taken.");
    }
    const newUser = { username, password };
    users.push(newUser);
    saveUsers(users);
    onAuth(newUser);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!username || !password) {
      return setError("Both fields are required.");
    }
    const users = loadUsers();
    const found = users.find(
      (u) => u.username === username && u.password === password
    );
    if (!found) {
      return setError("Invalid username or password.");
    }
    onAuth(found);
  };

  return (
    <div className="auth-form">
      <h2>{showSignUp ? "Sign Up" : "Login"}</h2>
      <form onSubmit={showSignUp ? handleSignUp : handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            setError("");
          }}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError("");
          }}
          required
        />
        {showSignUp && (
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setError("");
            }}
            required
          />
        )}
        <button type="submit">
          {showSignUp ? "Create Account" : "Login"}
        </button>
        {error && <p className="error">{error}</p>}
      </form>
      <p>
        {showSignUp
          ? "Already have an account?"
          : "Don't have an account?"}{" "}
        <span
          className="toggle"
          onClick={() => {
            setShowSignUp(!showSignUp);
            setError("");
          }}
        >
          {showSignUp ? "Login" : "Sign Up"}
        </span>
      </p>
    </div>
  );
};

export default AuthForm;
