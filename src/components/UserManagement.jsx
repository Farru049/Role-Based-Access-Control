import React, { useState, useContext } from 'react';
import { AuthContext } from './Login'; // Import the AuthContext
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faUserShield, faUser } from '@fortawesome/free-solid-svg-icons';

const UserManagement = () => {
  const { user } = useContext(AuthContext); // Get the logged-in user's data
  const [users, setUsers] = useState([
    { id: 1, name: user.name, email: user.email, role: user.role, status: 'Active' } // Dynamically use logged-in user's role
  ]);

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <header className="bg-teal-400 text-white p-6 rounded-t-xl shadow-lg">
        <h1 className="text-2xl font-bold text-center">User Management</h1>
        <p className="mt-2 text-center text-lg">
          Welcome, <span className="font-semibold">{user.name}</span> ({user.email})
        </p>
      </header>

      {/* Status Bar */}
      <div className="bg-gray-100 p-4 rounded-lg shadow-md flex justify-between items-center">
        <div className="text-sm text-gray-700">
          <p>
            <span className="font-bold">Name:</span> {user.name}
          </p>
          <p>
            <span className="font-bold">Email:</span> {user.email}
          </p>
          <p>
            <span className="font-bold">Role:</span> {user.role} {/* Dynamically display role */}
            <FontAwesomeIcon icon={user.role === 'Admin' ? faUserShield : faUser} className="ml-2 text-xl" />
          </p>
          <p>
            <span className="font-bold">Status:</span> Active
          </p>
        </div>
      </div>

      {/* User Management Table */}
      <table className="w-full bg-white shadow rounded-lg mt-4">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-3 text-left">User Name</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Role</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-b">
              <td className="p-3">{user.name}</td>
              <td className="p-3">{user.email}</td>
              <td className="p-3">
                {user.role}
                <FontAwesomeIcon icon={user.role === 'Admin' ? faUserShield : faUser} className="ml-2 text-xl" />
              </td>
              <td className="p-3">{user.status}</td>
              <td className="p-3">
                <button className="text-red-500 hover:text-red-700">
                  <FontAwesomeIcon icon={faTrashAlt} className="mr-2" />
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
