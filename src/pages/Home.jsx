import React, { useEffect, useState } from 'react';
import appwriteService from '../appwrite/conf';
import PostCard from '../components/PostCard';

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    appwriteService.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);

  if (posts.length === 0) {
    return (
        <div className="w-full py-8 mt-4 text-center ">
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold hover:text-gray-500">
                Login to read posts
              </h1>
            </div>
          </div>
        </div>
    );
  }

  return (
      <div className="w-full py-8 bg-gray-700">
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
              <PostCard $id={post.$id} featuredImage={post.img} title={post.title} />
            </div>
          ))}
        </div>
      </div>
  );
}

export default Home;
