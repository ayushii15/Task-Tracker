import React, { useState } from 'react';
import '../styles/Login.css';

const mockCredentials = {
  username: 'ayushi15',
  password: '12345'
};

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === mockCredentials.username && password === mockCredentials.password) {
      onLogin(username); 
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="login">
      <h1> Welcome to Task Tracker.</h1>
      <h2>Login to track your tasks</h2>
      <form className="login-form" onSubmit={handleLogin}>
        <div>
          <label className= "heading">Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="heading">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
