import React from 'react';
import { Link } from 'react-router-dom';
import RegistrationForm from '../components/authentication/RegistrationForm';

function Registration() {
  return (
    <div className="container mx-auto">
      <div className="flex flex-wrap justify-center">
        <div className="w-full md:w-1/2 md:flex md:items-center">
          <div className="content text-center px-4">
            <h1 className="text-primary text-3xl mb-4">
              Welcome to Chatelo Social!
            </h1>
            <p className="content text-lg mb-8">
              This is a new social media site that will allow you to share your
              thoughts and experiences with your friends. Register now and start
              enjoying! <br />
              Or if you already have an account, please{' '}
              <Link to="/login/" className="text-primary underline">
                login
              </Link>
              .
            </p>
          </div>
        </div>
        <div className="w-full md:w-1/2 p-5">
          <RegistrationForm />
        </div>
      </div>
    </div>
  );
}

export default Registration;
