import React, { useState, useContext, createContext } from 'react';

// ==========================
// Auth Context Setup
// ==========================
export const AuthContext = createContext(null);

// Authentication Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // State to hold current authenticated user

  // Mock login function (replace with actual authentication logic)
  const login = (email, password) => {
    // Simulated user data with roles
    const users = [
      { id: 1, name: 'Mohammad Farhaan Ali', email: 'farhaan@ali.com', role: 'Admin', password: 'farhaan123' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Editor', password: 'editor123' },
      { id: 3, name: 'Shyam', email: 'viewer@xyz.com', role: 'Viewer', password: 'viewer123' }, // Fixed id to 3
    ];

    console.log("Attempting login for email:", email); // Debugging log to check email
    const foundUser = users.find(u => u.email === email && u.password === password);
    console.log("Found User:", foundUser); // Debugging log to check the found user

    if (foundUser) {
      // Set the authenticated user details
      setUser({
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        role: foundUser.role,
      });
      return true; // Login successful
    }
    return false; // Login failed
  };

  // Logout function
  const logout = () => {
    setUser(null); // Reset user state to null
  };

  // Check if user has specific permission
  const hasPermission = (requiredPermissions) => {
    if (!user) return false; // If no user, no permissions

    // Simulated role-based permissions
    const rolePermissions = {
      'Admin': ['users:read', 'users:write', 'users:delete', 'roles:read', 'roles:write', 'roles:delete', 'permissions:read', 'permissions:write'],
      'Editor': ['users:read', 'roles:read', 'permissions:read'],
      'Viewer': ['users:read'],
    };

    const userPermissions = rolePermissions[user.role] || [];
    // Check if user has all the required permissions
    return requiredPermissions.every(perm => userPermissions.includes(perm));
  };

  // Return the context provider with values for children components
  return (
    <AuthContext.Provider value={{ user, login, logout, hasPermission }}>
      {children}
    </AuthContext.Provider>
  );
};

// ==========================
// Login Component
// ==========================
const Login = () => {
  const [email, setEmail] = useState(''); // State to manage email input
  const [password, setPassword] = useState(''); // State to manage password input
  const [error, setError] = useState(''); // State to manage error message
  const { login } = useContext(AuthContext); // Access login function from AuthContext

  // Handle the login submission
  const handleLogin = (e) => {
    e.preventDefault(); // Prevent page reload on form submission

    const success = login(email, password); // Attempt to login with provided credentials
    
    if (!success) {
      setError('Invalid email or password'); // Show error if login fails
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
            {error} {/* Display error message if login fails */}
          </div>
        )}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Update email state on input change
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Update password state on input change
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
