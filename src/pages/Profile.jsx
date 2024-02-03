import React from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import ProfileDetails from '../components/profile/ProfileDetails';
import useSWR from 'swr';
import { fetcher } from '../helpers/axios';
import Post from '../components/posts/Post';

function Profile() {
  const { profileId } = useParams();

  const user = useSWR(`/user/${profileId}/`, fetcher);

  const posts = useSWR(`/post/?author__public_id=${profileId}`, fetcher, {
    refreshInterval: 20000,
  });

  return (
    <Layout hasNavigationBack>
      <div className="mx-auto my-8 max-w-4xl">
        <div className="lg:flex lg:justify-center">
          <div className="lg:w-9/12">
            <ProfileDetails user={user.data} />
            <div className="my-4">
              {posts.data?.results.map((post, index) => (
                <Post key={index} post={post} refresh={posts.mutate} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Profile;
