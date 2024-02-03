import React, { useState, useContext } from 'react';
import axiosService from '../../helpers/axios';
import { getUser } from '../hooks/user.actions';
import { Context } from '../Layout';

function CreateComment(props) {
  const { postId, refresh } = props;
  const [validated, setValidated] = useState(false);
  const [form, setForm] = useState({
    author: '',
    body: '',
    post: '',
  });

  const { setToaster } = useContext(Context);

  const user = getUser();

  const handleSubmit = (event) => {
    event.preventDefault();
    const createCommentForm = event.currentTarget;

    if (createCommentForm.checkValidity() === false) {
      event.stopPropagation();
    }

    setValidated(true);

    const data = {
      author: user.id,
      body: form.body,
      post: postId,
    };

    axiosService
      .post(`/post/${postId}/comment/`, data)
      .then(() => {
        setForm({ ...form, body: '' });
        setToaster({
          type: 'success',
          message: 'Comment posted successfully🚀',
          show: true,
          title: 'Comment!',
        });
        refresh();
      })
      .catch(() => {
        setToaster({
          type: 'danger',
          message: '',
          show: true,
          title: 'An error occurred.!',
        });
      });
  };

  return (
    <form
      className="flex flex-row justify-between"
      noValidate
      validated={validated}
      onSubmit={handleSubmit}
      data-testid="create-comment-test"
    >
      <img
        src={user.avatar}
        alt={`${user.name}'s avatar`}
        className="rounded-full my-2 w-12 h-12"
      />
      <div className="m-3 w-75">
        <input
          className="py-2 px-4 rounded-full border border-primary w-full"
          type="text"
          data-testid="comment-body-field"
          placeholder="Write a comment"
          value={form.body}
          name="body"
          onChange={(e) => setForm({ ...form, body: e.target.value })}
        />
      </div>
      <div className="m-auto">
        <button
          type="button"
          className={`bg-primary text-white px-4 py-2 rounded-full ${
            !form.body && 'opacity-50 cursor-not-allowed'
          }`}
          data-testid="create-comment-submit"
          onClick={handleSubmit}
          disabled={!form.body}
        >
          Comment
        </button>
      </div>
    </form>
  );
}

export default CreateComment;
