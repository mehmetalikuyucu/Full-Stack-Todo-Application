import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../../axiosConfig';
import { toast } from 'react-toastify';

interface SignInFormInputs {
  username: string;
  password: string;
}

const SignIn: React.FC = () => {
  const { register, handleSubmit } = useForm<SignInFormInputs>();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const onSubmit = async (data: SignInFormInputs) => {
    try {
      const response = await axiosInstance.post('/auth/signin', data);
      const token = response.data.access_token;
      localStorage.setItem('token', token);
      toast.success('Sign in successful!');
      const user = await axiosInstance.get(`/user/username/${data.username}`); 
      localStorage.setItem('user', JSON.stringify(user.data));
      navigate('/dashboard');
    } catch (error) {
      toast.error('Sign in failed!');
    }
  };

  return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
    <div className="bg-white p-8 rounded shadow-md w-80">
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
      <h2 className="text-xl font-bold">Sign In</h2>
      <input
        {...register('username', { required: true })}
        type="text"
        placeholder="Username"
        className="p-2 border border-gray-300 rounded"
      />
      <input
        {...register('password', { required: true })}
        type="password"
        placeholder="Password"
        className="p-2 border border-gray-300 rounded"
      />
      <button type="submit" className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Sign In
      </button>
    </form>
    <button
        className="mt-4 text-blue-500 hover:underline"
        onClick={() => navigate('/signup')}
      >
         Don't have an account? 
      </button>
    </div>
    </div>
  );
};

export default SignIn;
