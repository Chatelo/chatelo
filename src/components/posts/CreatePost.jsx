import React, { useState, useContext } from 'react';
import axiosService from '../../helpers/axios';
import { getUser } from '../hooks/user.actions';
import { Context } from '../Layout';

function CreatePost({ refresh }) {
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);
  const [form, setForm] = useState({
    author: '',
    body: '',
  });

  const { setToaster } = useContext(Context);

  const user = getUser();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    const createPostForm = event.currentTarget;

    if (createPostForm.checkValidity() === false) {
      event.stopPropagation();
    }

    setValidated(true);

    const data = {
      author: user.id,
      body: form.body,
    };

    axiosService
      .post('/post/', data)
      .then(() => {
        handleClose();
        setToaster({
          type: 'success',
          message: 'Post created 🚀',
          show: true,
          title: 'Post Success',
        });
        setForm({}); // Clear the form
        refresh();
      })
      .catch(() => {
        setToaster({
          type: 'danger',
          message: 'An error occurred.',
          show: true,
          title: 'Post Error',
        });
      });
  };

  return (
    <>
      <div className="my-3 w-75">
        <input
          className="py-2 px-4 rounded-full border border-primary text-primary cursor-pointer"
          data-testid="show-modal-form"
          type="text"
          placeholder="Write a post"
          onClick={handleShow}
        />
      </div>

      <div
        className={`fixed inset-0 overflow-y-auto ${show ? 'block' : 'hidden'}`}
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div
            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
            aria-hidden="true"
            onClick={handleClose}
          ></div>
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
            <form
              noValidate
              validated={validated}
              onSubmit={handleSubmit}
              data-testid="create-
              
              -form"
            >
              <div className="mb-3">
                <textarea
                  name="body"
                  data-testid="post-body-field"
                  value={form.body}
                  onChange={(e) => setForm({ ...form, body: e.target.value })}
                  className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
                  rows={3}
                />
              </div>
              <div className="text-right">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md mr-2"
                  onClick={handleClose}
                >
                  Close
                </button>
                <button
                  type="submit"
                  className={`px-4 py-2 bg-blue-500 text-white rounded-md ${
                    !form.body && 'opacity-50 cursor-not-allowed'
                  }`}
                  disabled={!form.body}
                  data-testid="create-post-submit"
                >
                  Post
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreatePost;
