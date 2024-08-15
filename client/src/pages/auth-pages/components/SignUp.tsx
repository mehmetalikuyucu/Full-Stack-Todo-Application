import React from 'react';

const SignUp: React.FC = () => {
  return (
    <form className="flex flex-col space-y-4">
      <h2 className="text-xl font-bold">Sign Up</h2>
      <input
        type="text"
        placeholder="Name"
        className="p-2 border border-gray-300 rounded"
      />
      <input
        type="email"
        placeholder="Email"
        className="p-2 border border-gray-300 rounded"
      />
      <input
        type="password"
        placeholder="Password"
        className="p-2 border border-gray-300 rounded"
      />
      <button className="p-2 bg-green-500 text-white rounded hover:bg-green-600">
        Sign Up
      </button>
    </form>
  );
};

export default SignUp;
