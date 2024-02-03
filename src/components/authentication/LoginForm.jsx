import React, { useState } from 'react';
import { useUserActions } from '../hooks/user.actions';
import { Link } from 'react-router-dom';

function LoginForm() {
  const [validated, setValidated] = useState(false);
  const [form, setForm] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const userActions = useUserActions();

  const handleSubmit = (event) => {
    event.preventDefault();
    const loginForm = event.currentTarget;

    if (loginForm.checkValidity() === false) {
      event.stopPropagation();
    }

    setValidated(true);

    const data = {
      username: form.username,
      password: form.password,
    };

    userActions.login(data).catch((err) => {
      if (err.message) {
        setError(err.request.response);
      }
    });
  };

  return (
    <form
      id="registration-form"
      className="border p-4 rounded"
      noValidate
      validated={validated.toString()}
      onSubmit={handleSubmit}
      data-testid="login-form"
    >
      <div className="mb-3">
        <label
          htmlFor="username"
          className="block text-sm font-medium text-gray-600"
        >
          Username
        </label>
        <input
          id="username"
          value={form.username}
          data-testid="username-field"
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          required
          type="text"
          className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
          placeholder="Enter username"
        />
        <div className="text-red-500 text-xs">
          {validated && !form.username && 'This field is required.'}
        </div>
      </div>

      <div className="mb-3">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-600"
        >
          Password
        </label>
        <input
          id="password"
          value={form.password}
          data-testid="password-field"
          minLength="8"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
          type="password"
          className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
          placeholder="Password"
        />
        <div className="text-red-500 text-xs">
          {validated &&
            form.password.length < 8 &&
            'Please provide a valid password (min. 8 characters).'}
        </div>
      </div>

      <div className="text-red-500 text-xs">{error && <p>{error}</p>}</div>

      <button
        disabled={!form.password || !form.username}
        type="submit"
        className={`bg-blue-500 text-white px-4 py-2 rounded ${
          (!form.password || !form.username) && 'opacity-50 cursor-not-allowed'
        }`}
      >
        Submit
      </button>
      <div className="mt-3">
        <p>
          Not registered yet? <Link to="/registration">Register here</Link>
        </p>
      </div>
    </form>
  );
}

export default LoginForm;
