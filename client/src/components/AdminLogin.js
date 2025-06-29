// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import './AdminLogin.css';

// const AdminLogin = () => {
//   const [credentials, setCredentials] = useState({ username: '', password: '' });
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');

//     try {
//       const response = await axios.post('http://localhost:5000/api/admin/login', credentials);
//       localStorage.setItem('adminToken', response.data.token);
//       navigate('/admin/dashboard');
//     } catch (error) {
//       if (error.code === 'ERR_NETWORK') {
//         setError('Cannot connect to server. Please make sure the backend is running on port 5000.');
//       } else {
//         setError(error.response?.data?.message || 'Login failed');
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const createAdmin = async () => {
//     try {
//       await axios.post('http://localhost:5000/api/admin/create', {
//         username: 'admin',
//         password: 'admin123'
//       });
//       alert('Admin account created successfully! You can now login with username: admin, password: admin123');
//     } catch (error) {
//       if (error.code === 'ERR_NETWORK') {
//         alert('Cannot connect to server. Please make sure the backend is running on port 5000.');
//       } else {
//         alert(error.response?.data?.message || 'Failed to create admin account');
//       }
//     }
//   };

//   return (
//     <div className="admin-login">
//       <div className="login-container">
//         <h2>Admin Login</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label>Username:</label>
//             <input
//               type="text"
//               value={credentials.username}
//               onChange={(e) => setCredentials({...credentials, username: e.target.value})}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label>Password:</label>
//             <input
//               type="password"
//               value={credentials.password}
//               onChange={(e) => setCredentials({...credentials, password: e.target.value})}
//               required
//             />
//           </div>
//           {error && <div className="error">{error}</div>}
//           <button type="submit" disabled={loading}>
//             {loading ? 'Logging in...' : 'Login'}
//           </button>
//         </form>
//         <div className="create-admin">
//           <p>First time setup? Click below to create default admin account:</p>
//           <button onClick={createAdmin} className="create-admin-btn">
//             Create Admin Account
//           </button>
//           <p><small>Default credentials - Username: admin, Password: admin123</small></p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminLogin;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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
      const response = await axios.post('/api/admin/login', credentials);
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
      await axios.post('/api/admin/create', {
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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Admin Login</h2>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Username:
              </label>
              <input
                type="text"
                value={credentials.username}
                onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password:
              </label>
              <input
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
                {error}
              </div>
            )}
            
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
          
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="text-center space-y-4">
              <p className="text-sm text-gray-600">
                First time setup? Click below to create default admin account:
              </p>
              <button
                onClick={createAdmin}
                className="w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
              >
                Create Admin Account
              </button>
              <p className="text-xs text-gray-500">
                Default credentials - Username: admin, Password: admin123
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;