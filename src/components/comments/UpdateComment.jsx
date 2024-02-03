import React, { useState, useContext } from 'react';
import axiosService from '../../helpers/axios';
import { Context } from '../Layout';

function UpdateComment(props) {
  const { postId, comment, refresh } = props;
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);
  const [form, setForm] = useState({
    author: comment.author.id,
    body: comment.body,
    post: postId,
  });

  const { setToaster } = useContext(Context);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    const updateCommentForm = event.currentTarget;

    if (updateCommentForm.checkValidity() === false) {
      event.stopPropagation();
    }

    setValidated(true);

    const data = {
      author: form.author,
      body: form.body,
      post: postId,
    };

    axiosService
      .put(`/post/${postId}/comment/${comment.id}/`, data)
      .then(() => {
        handleClose();
        setToaster({
          type: 'success',
          message: 'Comment updated 🚀',
          show: true,
          title: 'Success!',
        });
        refresh();
      })
      .catch(() => {
        setToaster({
          type: 'danger',
          message: 'An error occurred.',
          show: true,
          title: 'Comment Error',
        });
      });
  };

  return (
    <>
      <button
        data-testid="show-modal-form"
        onClick={handleShow}
        className="cursor-pointer"
      >
        Modify
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className="border-0">
          <Modal.Title>Update Post</Modal.Title>
        </Modal.Header>
        <Modal.Body className="border-0">
          <form
            data-testid="update-comment-test"
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
          >
            <div className="mb-3">
              <textarea
                name="body"
                value={form.body}
                data-testid="comment-body-field"
                onChange={(e) => setForm({ ...form, body: e.target.value })}
                rows={3}
                className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button
            data-testid="update-comment-submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleSubmit}
          >
            Modify
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UpdateComment;
