import React, { useState } from 'react'
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';

type Props = {}

const AuthPage:React.FC = (props: Props) => {
    const [isSignIn, setIsSignIn] = useState(true);
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
    <div className="bg-white p-8 rounded shadow-md w-80">
      {isSignIn ? <SignIn /> : <SignUp />}
      <button
        className="mt-4 text-blue-500 hover:underline"
        onClick={() => setIsSignIn(!isSignIn)}
      >
        {isSignIn ? "Don't have an account? Sign Up" : 'Already have an account? Sign In'}
      </button>
    </div>
  </div>
  )
}

export default AuthPage