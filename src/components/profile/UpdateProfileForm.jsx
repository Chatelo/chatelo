import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserActions } from '../hooks/user.actions';
import { Context } from '../Layout';

function UpdateProfileForm(props) {
  const { profile } = props;
  const navigate = useNavigate();

  const [validated, setValidated] = useState(false);
  const [form, setForm] = useState(profile);
  const [error, setError] = useState(null);
  const userActions = useUserActions();

  const [avatar, setAvatar] = useState();

  const { setToaster } = useContext(Context);

  const handleSubmit = (event) => {
    event.preventDefault();
    const updateProfileForm = event.currentTarget;

    if (updateProfileForm.checkValidity() === false) {
      event.stopPropagation();
    }

    setValidated(true);

    const data = {
      first_name: form.first_name,
      last_name: form.last_name,
      bio: form.bio,
    };

    const formData = new FormData();

    // Checking for null values in the form and removing it.
    Object.keys(data).forEach((key) => {
      if (data[key]) {
        formData.append(key, data[key]);
      }
    });

    if (avatar) {
      formData.append('avatar', avatar);
    }

    userActions
      .edit(formData, profile.id)
      .then(() => {
        setToaster({
          type: 'success',
          message: 'Profile updated successfully 🚀',
          show: true,
          title: 'Profile updated',
        });
        navigate(-1);
      })
      .catch((err) => {
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
      validated={validated}
      onSubmit={handleSubmit}
    >
      <div className="mb-3 flex flex-col items-center">
        <label className="text-center">Avatar</label>
        <img
          src={form.avatar}
          alt={`${form.first_name}'s avatar`}
          className="rounded-full w-32 h-32 m-2 border-primary border-2 self-center"
        />
        <input
          onChange={(e) => setAvatar(e.target.files[0])}
          className="w-1/2 self-center"
          type="file"
          size="sm"
        />
        <div className="invalid-feedback">This file is required.</div>
      </div>
      <div className="mb-3">
        <label>First Name</label>
        <input
          value={form.first_name}
          onChange={(e) => setForm({ ...form, first_name: e.target.value })}
          required
          type="text"
          placeholder="Enter first name"
          className="w-full"
        />
        <div className="invalid-feedback">This field is required.</div>
      </div>
      <div className="mb-3">
        <label>Last Name</label>
        <input
          value={form.last_name}
          onChange={(e) => setForm({ ...form, last_name: e.target.value })}
          required
          type="text"
          placeholder="Enter last name"
          className="w-full"
        />
        <div className="invalid-feedback">This field is required.</div>
      </div>
      <div className="mb-3">
        <label>Bio</label>
        <textarea
          value={form.bio}
          onChange={(e) => setForm({ ...form, bio: e.target.value })}
          rows={3}
          placeholder="A simple bio ... (Optional)"
          className="w-full"
        />
      </div>
      <div className="text-content text-danger">{error && <p>{error}</p>}</div>
      <button className="bg-primary text-white py-2 px-4 rounded" type="submit">
        Save changes
      </button>
    </form>
  );
}

export default UpdateProfileForm;
