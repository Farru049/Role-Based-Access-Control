import React, { useState, useContext } from 'react';
import { AuthContext } from './Login';
import UserManagement from './UserManagement';
import RoleManagement from './RoleManagement';
import PermissionManagement from './PermissionManagement';
import Login from './Login';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('users');
  const { user, logout, hasPermission } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {!user ? (
        <Login />
      ) : (
        <div className="bg-white shadow-lg rounded-xl">
          <header className="bg-blue-600 text-white p-6 rounded-t-xl shadow-lg">
            <h1 className="text-3xl font-bold text-center">Role-Based Access System</h1>
            <p className="mt-2 text-center text-lg">Manage Users, Roles, and Permissions Efficiently</p>
          </header>

          <div className="border-b flex justify-between items-center p-4">
            <nav className="flex space-x-4">
              {['users', 'roles', 'permissions']
                .filter((tab) => hasPermission([`${tab}:read`]))
                .map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 rounded-md transition-colors ${
                      activeTab === tab
                        ? 'bg-blue-500 text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)} Management
                  </button>
                ))}
            </nav>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-700">
                <p>
                  <span className="font-bold">Name:</span> {user.name}
                </p>
                <p>
                  <span className="font-bold">Email:</span> {user.email}
                </p>
                <p>
                  <span className="font-bold">Role:</span> {user.role}
                </p>
              </div>
              <button
                onClick={logout}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          </div>

          <div className="p-6">
            {activeTab === 'users' && hasPermission(['users:read']) && <UserManagement />}
            {activeTab === 'roles' && hasPermission(['roles:read']) && <RoleManagement />}
            {activeTab === 'permissions' && hasPermission(['permissions:read']) && <PermissionManagement />}
          </div>
        </div>
      )}

      <footer className="bg-gray-800 text-white text-center py-4 mt-8">
        <p>Made by Mohammad Farhaan Ali, @copyright: 2024</p>
      </footer>
    </div>
  );
};

export default Dashboard;
