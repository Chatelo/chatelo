import React, { useContext } from 'react';
import { format } from 'timeago.js';
import { Link } from 'react-router-dom';
import { LikeFilled, CommentOutlined, LikeOutlined } from '@ant-design/icons';
import axiosService from '../../helpers/axios';
import UpdatePost from './UpdatePost';
import { getUser } from '../hooks/user.actions';
import { Context } from '../Layout';
import MoreToggleIcon from '../MoreToggleIcon';

function Post(props) {
  const { post, refresh, isSinglePost } = props;
  const { setToaster } = useContext(Context);

  const user = getUser();

  const handleLikeClick = (action) => {
    axiosService
      .post(`/post/${post.id}/${action}/`)
      .then(() => {
        refresh();
      })
      .catch((err) => console.error(err));
  };

  const handleDelete = () => {
    axiosService
      .delete(`/post/${post.id}/`)
      .then(() => {
        setToaster({
          type: 'warning',
          message: 'Post deleted 🚀',
          show: true,
          title: 'Post Deleted',
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
      <div className="rounded-3 my-4 bg-white p-4 border border-gray-300">
        <div className="flex justify-between">
          <div className="flex">
            <img
              src={post.author.avatar}
              alt="Author Avatar"
              className="me-2 border-primary border-2 rounded-full"
              width={48}
              height={48}
            />
            <div className="flex flex-col justify-start mt-2">
              <p className="text-sm font-medium">{post.author.name}</p>
              <p className="text-sm font-light">
                <small>{format(post.created)}</small>
              </p>
            </div>
          </div>
          {user.name === post.author.name && (
            <div>
              <div className="relative inline-block text-left">
                <MoreToggleIcon />
                <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div
                    className="py-1"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                  >
                    <UpdatePost post={post} refresh={refresh} />
                    <button
                      onClick={handleDelete}
                      className="dropdown-item text-danger"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <p className="text-base">{post.body}</p>
        <div className="flex justify-between">
          <div className="flex">
            <LikeFilled className="text-white bg-blue-500 rounded-full p-1" />
            <p className="text-sm ms-1">
              <small>{post.likes_count} like</small>
            </p>
          </div>
          {!isSinglePost && (
            <p className="text-sm ms-1">
              <small>
                <Link to={`/post/${post.id}/`}>
                  {post.comments_count} comments
                </Link>
              </small>
            </p>
          )}
        </div>
      </div>
      <div className="flex justify-between bg-white w-1/2 border-0">
        <div className="flex">
          <LikeOutlined
            className={`w-6 h-6 ${post.liked ? 'text-blue-500' : 'text-gray-400'}`}
            onClick={() => {
              if (post.liked) {
                handleLikeClick('remove_like');
              } else {
                handleLikeClick('like');
              }
            }}
          />
          <p className="ms-1">
            <small>Like</small>
          </p>
        </div>
        {!isSinglePost && (
          <div className="flex">
            <CommentOutlined className="w-6 h-6 text-gray-400" />
            <p className="ms-1 mb-0">
              <small>Comment</small>
            </p>
          </div>
        )}
      </div>
    </>
  );
}

export default Post;
