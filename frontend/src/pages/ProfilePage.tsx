import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="text-center mt-10">
      <h1 className="text-3xl font-bold mb-6">Welcome to Our App</h1>
      {!isAuthenticated && (
        <div className="space-x-4">
          <Link to="/login" className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Login
          </Link>
          <Link to="/register" className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600">
            Register
          </Link>
        </div>
      )}
    </div>
  );
};

export default HomePage;