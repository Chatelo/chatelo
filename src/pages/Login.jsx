import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../components/authentication/LoginForm';

function Login() {
  return (
    <div className="container mx-auto flex flex-wrap items-center justify-center min-h-screen">
      <div className="md:w-1/2 p-8">
        <div className="content text-center">
          <h1 className="text-primary text-4xl font-bold mb-4">
            Welcome to Chatelo Social!
          </h1>
          <p className="content">
            Login now and start enjoying! <br />
            Or if you don't have an account, please{' '}
            <Link to="/register/" className="text-primary">
              register
            </Link>
            .
          </p>
        </div>
      </div>
      <div className="md:w-1/2 p-5">
        <LoginForm />
      </div>
    </div>
  );
}

export default Login;
