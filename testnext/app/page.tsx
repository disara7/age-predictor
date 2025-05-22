"use client"; // Add this at the top

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Use this from next/navigation
import Navbar from './components/Navbar';

export default function LandingPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter(); // This should be used here

  const toggleForm = () => setIsLogin(!isLogin);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const userData = { username, password };

    console.log("Form submitted with data:", userData);

    try {
      const response = await fetch(`http://localhost:5001/auth/${isLogin ? 'login' : 'register'}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      console.log('Backend response:', data);

      if (response.ok) {
        if (isLogin) {
          alert('Login Success'); // Show login success message
          router.push('/home'); // Navigate to the home page after login
        } else {
          alert(data.message || 'Account created successfully!'); // Show success message for account creation
        }
      } else {
        alert(data.message || 'Something went wrong'); // If response is not ok, show error message
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting the form.');
    }

    setUsername('');
    setPassword('');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50">
      <Navbar /> 
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Age Predictor</h1>
      <p className="text-lg text-gray-600 mb-6">Please {isLogin ? 'Login' : 'Create an Account'} to Continue</p>

      {isLogin ? (
        <div className="bg-white mb-2 p-6 rounded-lg shadow-lg w-96">
          <form onSubmit={handleFormSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Username</label>
              <input
                type="text"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your username"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
              Login
            </button>
          </form>
          <p className="text-center text-sm text-gray-600 mt-4">
            Don't have an account?{' '}
            <button onClick={toggleForm} className="text-blue-500 hover:underline">
              Create one
            </button>
          </p>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          <form onSubmit={handleFormSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Username</label>
              <input
                type="text"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your username"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
              Create Account
            </button>
          </form>
          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{' '}
            <button onClick={toggleForm} className="text-blue-500 hover:underline">
              Login
            </button>
          </p>
        </div>
      )}
    </div>
  );
}
