import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../../axiosConfig';
import { toast } from 'react-toastify';

interface SignUpFormInputs {
  username: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<SignUpFormInputs>();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/dashboard'); 
    }
  }, [navigate]);

  const onSubmit = async (data: SignUpFormInputs) => {
    try {
      const response = await axiosInstance.post('/auth/signup', data);
      navigate('/signin');
      toast.success('Sign up successful! Please sign in.');
    } catch (error) {
      toast.error('Sign up failed!');
    }
  };

  return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
    <div className="bg-white p-8 rounded shadow-md w-80">
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
      <h2 className="text-xl font-bold">Sign Up</h2>
      <input
        {...register('username', { required: true })}
        type="text"
        placeholder="Username"
        className="p-2 border border-gray-300 rounded"
      />
      <input
        {...register('email', {
          required: true,
          pattern: {
            value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
            message: "Invalid email address"
          }
        })}
        type="email"
        placeholder="Email"
        className="p-2 border border-gray-300 rounded"
      />
      {errors.email && <span className="text-red-500">{errors.email.message}</span>}
      <input
        {...register('password', { required: true })}
        type="password"
        placeholder="Password"
        className="p-2 border border-gray-300 rounded"
      />
      <button type="submit" className="p-2 bg-green-500 text-white rounded hover:bg-green-600">
        Sign Up
      </button>
      <button
        className="mt-4 text-blue-500 hover:underline"
        onClick={() => navigate('/signin')}
      >
       Already have an account? Sign In
      </button>
    </form>
    </div>
    </div>
  );
};

export default SignUp;
