import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner'

function PasswordUpdate() {
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }
    try {
      setLoading(true);
      const response = await axios.put('/api/passwordReset/updatePassword', {
        token,
        password,
      });
      setLoading(false);
      if (response.status === 200) {
        setPassword('');
        setConfirmPassword('');
        toast.success('Password updated successfully. Please try logging in.');
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  if(loading) {
    return <Spinner />
  }

  return (
    <div className="bg-gray-600 h-screen flex  justify-center">
      <div className="bg-gray-800 w-full max-w-md mx-auto p-8 rounded-lg">
        <h2 className="text-white text-2xl font-bold mb-6">UPDATE PASSWORD</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-white font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Enter your new password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-white font-bold mb-2" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              className="appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="confirmPassword"
              type="password"
              placeholder="Confirm your new password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
          </div>
          <div className="flex items-center justify-between">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg" type="submit" disabled={loading}>
              {loading ? 'Loading...' : 'Update Password'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PasswordUpdate;
