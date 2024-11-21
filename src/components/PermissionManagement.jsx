import React, { useState } from 'react';

const PermissionManagement = () => {
  const [permissions, setPermissions] = useState({
    'users:read': 'View user list and details',
    'users:write': 'Create and modify users',
    'users:delete': 'Remove users from system',
    'roles:read': 'View role configurations',
    'roles:write': 'Create and modify roles',
  });

  const [newPermission, setNewPermission] = useState({
    key: '',
    description: ''
  });

  // Function to add a new permission
  const addPermission = () => {
    if (!newPermission.key || !newPermission.description) {
      alert('Please provide both permission key and description');
      return;
    }

    setPermissions({
      ...permissions,
      [newPermission.key]: newPermission.description
    });

    // Reset the form after adding the permission
    setNewPermission({ key: '', description: '' });
  };

  // Function to delete a permission by key
  const deletePermission = (key) => {
    const updatedPermissions = { ...permissions };
    delete updatedPermissions[key];
    setPermissions(updatedPermissions);
  };

  return (
    <div className="space-y-6">
      {/* New Permission Input Section */}
      <div className="bg-blue-50 p-4 rounded-lg grid grid-cols-3 gap-4">
        <input
          placeholder="Permission Key (e.g. users:read)"
          value={newPermission.key}
          onChange={(e) => setNewPermission({ ...newPermission, key: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          placeholder="Permission Description"
          value={newPermission.description}
          onChange={(e) => setNewPermission({ ...newPermission, description: e.target.value })}
          className="border p-2 rounded"
        />
        <button
          onClick={addPermission}
          className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
        >
          Add Permission
        </button>
      </div>

      {/* Permissions Table */}
      <table className="w-full bg-white shadow rounded-lg">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-3 text-left">Permission Key</th>
            <th className="p-3 text-left">Description</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Map through permissions and display them */}
          {Object.entries(permissions).map(([key, description]) => (
            <tr key={key} className="border-b">
              <td className="p-3">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                  {key}
                </span>
              </td>
              <td className="p-3">{description}</td>
              <td className="p-3">
                <button
                  onClick={() => deletePermission(key)}
                  className="text-red-500 hover:text-red-700"
                >
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

export default PermissionManagement;
