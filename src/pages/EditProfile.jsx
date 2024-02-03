import React from 'react';
import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import Layout from '../components/Layout';
import UpdateProfileForm from '../components/profile/UpdateProfileForm';
import { fetcher } from '../helpers/axios';

function EditProfile() {
  const { profileId } = useParams();

  const profile = useSWR(`/user/${profileId}/`, fetcher);

  return (
    <Layout hasNavigationBack>
      {profile.data ? (
        <div className="flex justify-center items-center min-h-screen">
          <div className="w-full md:w-96">
            <UpdateProfileForm profile={profile.data} />
          </div>
        </div>
      ) : (
        <div className="text-center">Loading...</div>
      )}
    </Layout>
  );
}

export default EditProfile;
