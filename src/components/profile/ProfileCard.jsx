import React from 'react';
import { useNavigate } from 'react-router-dom';

function ProfileCard(props) {
  const navigate = useNavigate();
  const { user } = props;

  const handleNavigateToProfile = () => {
    navigate(`/profile/${user.id}/`);
  };

  return (
    <div className="border p-2" data-testid="profile-card">
      <div className="flex items-center">
        <img
          src={user.avatar}
          alt={`${user.name}'s avatar`}
          className="rounded-full w-12 h-12 my-3 border-primary border-2"
        />
        <div className="ml-3">
          <p className="text-sm">{user.name}</p>
          <button
            onClick={handleNavigateToProfile}
            className="mt-2 bg-primary text-white py-2 px-4 rounded"
          >
            See profile
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;
