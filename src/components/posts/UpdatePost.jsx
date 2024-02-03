import React, { useContext, useState } from 'react';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import axiosService from '../../helpers/axios';
import { Context } from '../Layout';

function UpdatePost(props) {
  const { post, refresh } = props;
  const [modalOpen, setModalOpen] = useState(false);
  const [validated, setValidated] = useState(false);
  const [form, setForm] = useState({
    author: post.author.id,
    body: post.body,
  });

  const { setToaster } = useContext(Context);

  const handleClose = () => setModalOpen(false);
  const handleShow = () => setModalOpen(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    const updatePostForm = event.currentTarget;

    if (updatePostForm.checkValidity() === false) {
      event.stopPropagation();
    }

    setValidated(true);

    const data = {
      author: form.author,
      body: form.body,
    };

    axiosService
      .put(`/post/${post.id}/`, data)
      .then(() => {
        handleClose();
        setToaster({
          type: 'success',
          message: 'Post updated 🚀',
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
          title: 'Post Error',
        });
      });
  };

  return (
    <>
      <button
        data-testid="show-modal-form"
        className="dropdown-item"
        onClick={handleShow}
      >
        Modify
      </button>

      <Modal open={modalOpen} onClose={handleClose} center>
        <div className="modal-content">
          <form
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
            data-testid="update-post-form"
          >
            <div className="mb-3">
              <textarea
                name="body"
                value={form.body}
                data-testid="post-body-field"
                onChange={(e) => setForm({ ...form, body: e.target.value })}
                className="form-control"
                rows={3}
              />
            </div>
          </form>
          <div className="modal-footer">
            <button
              data-testid="update-post-submit"
              className="btn btn-primary"
              onClick={handleSubmit}
            >
              Modify
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default UpdatePost;
