import React, { useState } from 'react';
import { useUserActions } from '../hooks/user.actions';

function RegistrationForm() {
  const [validated, setValidated] = useState(false);
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    bio: '',
  });
  const [error, setError] = useState(null);
  const userActions = useUserActions();

  const handleSubmit = (event) => {
    event.preventDefault();
    const registrationForm = event.currentTarget;

    if (registrationForm.checkValidity() === false) {
      event.stopPropagation();
    }

    setValidated(true);

    const data = {
      username: form.username,
      password: form.password,
      email: form.email,
      first_name: form.first_name,
      last_name: form.last_name,
      bio: form.bio,
    };

    userActions.register(data).catch((err) => {
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
      data-testid="register-form"
    >
      <div className="mb-3">
        <label
          htmlFor="first-name"
          className="block text-sm font-medium text-gray-600"
        >
          First Name
        </label>
        <input
          id="first-name"
          value={form.first_name}
          data-testid="first-name-field"
          onChange={(e) => setForm({ ...form, first_name: e.target.value })}
          required
          type="text"
          className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
          placeholder="Enter first name"
        />
        <div className="text-red-500 text-xs">
          {validated && !form.first_name && 'This field is required.'}
        </div>
      </div>
      <div className="mb-3">
        <label
          htmlFor="last-name"
          className="block text-sm font-medium text-gray-600"
        >
          Last Name
        </label>
        <input
          id="last-name"
          value={form.last_name}
          data-testid="last-name-field"
          onChange={(e) => setForm({ ...form, last_name: e.target.value })}
          required
          type="text"
          className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
          placeholder="Enter last name"
        />
        <div className="text-red-500 text-xs">
          {validated && !form.last_name && 'This field is required.'}
        </div>
      </div>
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
          htmlFor="email"
          className="block text-sm font-medium text-gray-600"
        >
          Email Address
        </label>
        <input
          id="email"
          value={form.email}
          data-testid="email-field"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
          type="email"
          className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
          placeholder="Enter email"
        />
        <div className="text-red-500 text-xs">
          {validated && !form.email && 'This field is required.'}
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

      <div className="mb-3">
        <label
          htmlFor="bio"
          className="block text-sm font-medium text-gray-600"
        >
          Bio
        </label>
        <textarea
          id="bio"
          value={form.bio}
          data-testid="bio-field"
          onChange={(e) => setForm({ ...form, bio: e.target.value })}
          className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
          rows={3}
          placeholder="A simple bio ... (Optional)"
        />
      </div>

      <div className="text-red-500 text-xs">{error && <p>{error}</p>}</div>

      <button
        data-testid="submit-button"
        disabled={
          !form.password ||
          !form.username ||
          !form.email ||
          !form.first_name ||
          !form.last_name
        }
        type="submit"
        className={`bg-blue-500 text-white px-4 py-2 rounded ${
          (!form.password ||
            !form.username ||
            !form.email ||
            !form.first_name ||
            !form.last_name) &&
          'opacity-50 cursor-not-allowed'
        }`}
      >
        Submit
      </button>
    </form>
  );
}

export default RegistrationForm;
