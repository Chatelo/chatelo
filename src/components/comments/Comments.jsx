import React, { useContext } from 'react';
import { format } from 'timeago.js';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import axiosService from '../../helpers/axios';
import { getUser } from '../hooks/user.actions';
import UpdateComment from './UpdateComment';
import { Context } from '../Layout';
import MoreToggleIcon from '../MoreToggleIcon';

function Comment(props) {
  const { postId, comment, refresh } = props;
  const { setToaster } = useContext(Context);

  const user = getUser();

  const handleLikeClick = (action) => {
    axiosService
      .post(`/post/${postId}/comment/${comment.id}/${action}/`)
      .then(() => {
        refresh();
      })
      .catch((err) => console.error(err));
  };

  const handleDelete = () => {
    axiosService
      .delete(`/post/${postId}/comment/${comment.id}/`)
      .then(() => {
        setToaster({
          type: 'danger',
          message: 'Comment deleted 🚀',
          show: true,
          title: 'Comment Deleted',
        });
        refresh();
      })
      .catch(() => {
        setToaster({
          type: 'warning',
          message: 'Comment deleted 🚀',
          show: true,
          title: 'Comment Deleted',
        });
      });
  };

  return (
    <div className="rounded-3 my-2" data-testid="comment-test">
      <div className="bg-white p-4">
        <div className="d-flex flex-row justify-content-between">
          <div className="d-flex flex-row">
            <img
              src={comment.author.avatar}
              alt={`${comment.author.name}'s avatar`}
              className="rounded-full w-12 h-12 border-2 border-primary"
            />
            <div className="d-flex flex-column justify-content-start align-self-center mt-2 ms-2">
              <p className="text-base font-medium">{comment.author.name}</p>
              <p className="text-sm font-light">
                <small>{format(comment.created)}</small>
              </p>
            </div>
          </div>
          {user.name === comment.author.name && (
            <div>
              <div className="relative group">
                <MoreToggleIcon />
                <div className="hidden group-hover:block absolute right-0 mt-2 w-48 bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg">
                  <UpdateComment
                    comment={comment}
                    refresh={refresh}
                    postId={postId}
                  />
                  <button
                    onClick={handleDelete}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        <p className="mt-2 text-sm">{comment.body}</p>
        <div className="d-flex flex-row justify-content-between mt-2">
          <div className="d-flex flex-row">
            <HeartFilled
              style={{
                color: '#fff',
                backgroundColor: '#0D6EFD',
                borderRadius: '50%',
                width: '18px',
                height: '18px',
                fontSize: '75%',
                padding: '2px',
                margin: '3px',
              }}
            />
            <p className="ms-1 text-sm">
              <small>{comment.likes_count} like</small>
            </p>
          </div>
        </div>
      </div>
      <div className="bg-white w-50 p-4 flex justify-between border-t border-gray-200">
        <div className="flex flex-row items-center">
          <HeartOutlined
            style={{
              width: '24px',
              height: '24px',
              padding: '2px',
              fontSize: '20px',
              color: comment.liked ? '#0D6EFD' : '#C4C4C4',
            }}
            onClick={() => {
              if (comment.liked) {
                handleLikeClick('remove_like');
              } else {
                handleLikeClick('like');
              }
            }}
          />
          <p className="ms-1 text-sm">
            <small>Like</small>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Comment;
