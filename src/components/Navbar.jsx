import React, { useContext } from 'react';
import { Context } from './Layout';
import { Link } from 'react-router-dom';
import { getUser, useUserActions } from '../components/hooks/user.actions';

function NavigationBar() {
  const { setToaster } = useContext(Context);
  const userActions = useUserActions();
  const user = getUser();

  const handleLogout = () => {
    userActions.logout().catch((e) =>
      setToaster({
        type: 'danger',
        message: 'Logout failed',
        show: true,
        title: e.data?.detail | 'An error occurred.',
      })
    );
  };

  return (
    <nav className="bg-primary text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to={`/`} className="font-bold text-xl">
          Chatelo Social
        </Link>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <button className="flex items-center">
              <img
                src={user.avatar}
                alt="User Avatar"
                className="w-9 h-9 rounded-full"
              />
            </button>
            <div className="absolute top-0 right-0 -mt-2 -mr-2">
              <div className="bg-white border rounded-md shadow-md hidden group-hover:block">
                <Link
                  to={`/profile/${user.id}/`}
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavigationBar;
