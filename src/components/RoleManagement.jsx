import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

// RoleManagement Component for handling role creation, deletion, and permission management
const RoleManagement = () => {
  // State to hold the list of roles
  const [roles, setRoles] = useState([
    { 
      id: 1, 
      name: 'Admin', 
      permissions: ['users:read', 'users:write', 'roles:read', 'roles:write'] 
    }
  ]);

  // State to manage the form for creating new roles
  const [newRole, setNewRole] = useState({
    name: '',
    permissions: []
  });

  // Predefined permission options for roles
  const permissionOptions = [
    'users:read', 'users:write','users:update','users:delete',
    'roles:read', 'roles:write','roles:update', 'roles:delete',
    'permissions:read', 'permissions:write'
  ];

  // Function to add a new role
  const addRole = () => {
    // Validate that role name and permissions are provided
    if (!newRole.name || newRole.permissions.length === 0) {
      alert('Please provide role name and permissions');
      return;
    }

    // Create a new role object and add it to the roles state
    const role = {
      ...newRole,
      id: Date.now()  // Use current timestamp as a unique ID
    };

    setRoles([...roles, role]);
    setNewRole({ name: '', permissions: [] });  // Reset the form
  };

  // Function to delete a role by ID
  const deleteRole = (id) => {
    setRoles(roles.filter(role => role.id !== id));  // Remove the role by ID
  };

  // Toggle permission for the new role
  const togglePermission = (permission) => {
    setNewRole(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permission)
        ? prev.permissions.filter(p => p !== permission)  // Remove permission
        : [...prev.permissions, permission]  // Add permission
    }));
  };

  return (
    <div className="space-y-6">
      {/* New Role Creation Section */}
      <div className="bg-blue-50 p-4 rounded-lg shadow-md">
        <div className="grid grid-cols-2 gap-4">
          <input
            placeholder="Role Name"
            value={newRole.name}
            onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={addRole}
            className="bg-green-500 text-white p-2 rounded hover:bg-green-600 flex items-center justify-center space-x-2"
          >
            <FontAwesomeIcon icon={faUserPlus} />
            <span>Create Role</span>
          </button>
        </div>
        
        {/* Permissions Checklist */}
        <div className="mt-4 grid grid-cols-3 gap-2">
          {permissionOptions.map(permission => (
            <label key={permission} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={newRole.permissions.includes(permission)}
                onChange={() => togglePermission(permission)}
                className="form-checkbox h-5 w-5 text-blue-500"
              />
              <span>{permission}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Roles Table */}
      <table className="w-full bg-white shadow-lg rounded-lg mt-6">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-3 text-left">Role Name</th>
            <th className="p-3 text-left">Permissions</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Loop through roles and display them */}
          {roles.map(role => (
            <tr key={role.id} className="border-b">
              <td className="p-3">{role.name}</td>
              <td className="p-3">
                {/* Display permissions for each role */}
                {role.permissions.map(perm => (
                  <span 
                    key={perm} 
                    className="bg-blue-100 text-blue-800 px-2 py-1 rounded mr-2 mb-1 inline-block"
                  >
                    {perm}
                  </span>
                ))}
              </td>
              <td className="p-3">
                {/* Delete button for each role */}
                <button
                  onClick={() => deleteRole(role.id)}
                  className="text-red-500 hover:text-red-700 flex items-center space-x-1"
                >
                  <FontAwesomeIcon icon={faTrashAlt} />
                  <span>Delete</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RoleManagement;
