import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { SignIn, SignUp } from './pages/auth-pages';
import Dashboard from './pages/task-dashboard/Dashboard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocalStorage } from './hooks/useLocalStorage';
import ProtectedRoute from './components/protectedRoute';
const App: React.FC = () => {
  const token = useLocalStorage().getAccessToken();
  return (
    <Router>
      <div className="min-h-screen flex flex-col items-center justify-center min-w-screen bg-slate-400">
        <Routes>
          <Route path="/signin" element={token ? <Navigate to="/dashboard" replace /> : <SignIn />} />
          <Route path="/signup" element={token ? <Navigate to="/dashboard" replace /> : <SignUp />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/" element={<Navigate to={token ? "/dashboard" : "/signin"} replace />} />
        </Routes>
        <ToastContainer />
      </div>
    </Router>
  );
};

export default App;

