import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AdminLogin.css';

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/api/admin/login', credentials);
      localStorage.setItem('adminToken', response.data.token);
      navigate('/admin/dashboard');
    } catch (error) {
      if (error.code === 'ERR_NETWORK') {
        setError('Cannot connect to server. Please make sure the backend is running on port 5000.');
      } else {
        setError(error.response?.data?.message || 'Login failed');
      }
    } finally {
      setLoading(false);
    }
  };

  const createAdmin = async () => {
    try {
      await axios.post('http://localhost:5000/api/admin/create', {
        username: 'admin',
        password: 'admin123'
      });
      alert('Admin account created successfully! You can now login with username: admin, password: admin123');
    } catch (error) {
      if (error.code === 'ERR_NETWORK') {
        alert('Cannot connect to server. Please make sure the backend is running on port 5000.');
      } else {
        alert(error.response?.data?.message || 'Failed to create admin account');
      }
    }
  };

  return (
    <div className="admin-login">
      <div className="login-container">
        <h2>Admin Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username:</label>
            <input
              type="text"
              value={credentials.username}
              onChange={(e) => setCredentials({...credentials, username: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              value={credentials.password}
              onChange={(e) => setCredentials({...credentials, password: e.target.value})}
              required
            />
          </div>
          {error && <div className="error">{error}</div>}
          <button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <div className="create-admin">
          <p>First time setup? Click below to create default admin account:</p>
          <button onClick={createAdmin} className="create-admin-btn">
            Create Admin Account
          </button>
          <p><small>Default credentials - Username: admin, Password: admin123</small></p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;