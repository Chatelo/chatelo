import React from 'react';
import Layout from '../components/Layout';
import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import { fetcher } from '../helpers/axios';
import Post from '../components/posts/Post';
import CreateComment from '../components/comments/CreateComments';
import Comment from '../components/comments/Comments';

function SinglePost() {
  const { postId } = useParams();

  const post = useSWR(`/post/${postId}/`, fetcher);

  const comments = useSWR(`/post/${postId}/comment/`, fetcher);

  return (
    <Layout hasNavigationBack>
      {post.data ? (
        <div className="mx-auto my-8 max-w-4xl">
          <div className="lg:flex lg:justify-center">
            <div className="lg:w-8/12">
              <Post post={post.data} refresh={post.mutate} isSinglePost />
              <CreateComment postId={post.data.id} refresh={comments.mutate} />
              {comments.data &&
                comments.data.results.map((comment, index) => (
                  <Comment
                    key={index}
                    postId={post.data.id}
                    comment={comment}
                    refresh={comments.mutate}
                  />
                ))}
            </div>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </Layout>
  );
}

export default SinglePost;
