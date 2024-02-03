import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../hooks/user.actions';

function ProfileDetails(props) {
  const { user } = props;
  const navigate = useNavigate();

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div
        className="flex items-center border-b p-5"
        data-testid="profile-details"
      >
        <img
          src={user.avatar}
          alt={`${user.name}'s avatar`}
          className="rounded-full w-24 h-24 me-5 border-primary border-2"
        />
        <div className="flex flex-col justify-start">
          <p className="text-lg mb-0">{user.name}</p>
          <p className="text-xl">{user.bio ? user.bio : '(No bio.)'}</p>
          <p className="text-sm">
            <small>{user.posts_count} posts</small>
          </p>
          {user.id === getUser().id && (
            <button
              onClick={() => navigate(`/profile/${user.id}/edit/`)}
              className="bg-primary text-white py-2 px-4 rounded w-25"
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfileDetails;
