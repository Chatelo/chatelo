import React from 'react';
import Layout from '../components/Layout';
import useSWR from 'swr';
import { fetcher } from '../helpers/axios';
import { getUser } from '../components/hooks/user.actions';
import CreatePost from '../components/posts/CreatePost';
import ProfileCard from '../components/profile/ProfileCard';
import Post from '../components/posts/Post';

function Home() {
  const posts = useSWR('/post/', fetcher, {
    refreshInterval: 20000,
  });
  const profiles = useSWR('/user/?limit=5', fetcher);

  const user = getUser();

  if (!user) {
    return <div>Loading!</div>;
  }

  return (
    <Layout>
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <div className="flex border rounded items-center">
            <div className="flex-shrink-0">
              <img
                src={user.avatar}
                alt="User Avatar"
                className="rounded-circle w-12 h-12 m-2"
              />
            </div>
            <div className="flex-grow-1">
              <CreatePost refresh={posts.mutate} />
            </div>
          </div>
          <div className="my-4">
            {posts.data?.results.map((post, index) => (
              <Post key={index} post={post} refresh={posts.mutate} />
            ))}
          </div>
        </div>
        <div className="col-span-1 border rounded py-4">
          <h4 className="font-bold text-center mb-4">Suggested people</h4>
          <div className="flex flex-col">
            {profiles.data &&
              profiles.data.results.map((profile, index) => (
                <ProfileCard key={index} user={profile} />
              ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Home;
