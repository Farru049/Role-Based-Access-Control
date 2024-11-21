import React, { useState } from "react";
import Dashboard from "./components/Dashboard";
import { AuthProvider } from "./components/Login";

const App = () => {
  const [showPopup, setShowPopup] = useState(true);

  return (
    <AuthProvider>
      {showPopup && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg text-center">
            <h2 className="text-xl font-bold mb-4">Admin Credentials</h2>
            <p>Email: <strong>farhaan@ali.com</strong></p>
            <p>Password: <strong>farhaan123</strong></p>
            <button
              onClick={() => setShowPopup(false)}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
            >
              Got it!
            </button>
          </div>
        </div>
      )}
      <Dashboard />
    </AuthProvider>
  );
};

export default App;
