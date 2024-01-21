import React, { useState, useEffect } from 'react';
import appwriteService from '../appwrite/conf';
import PostCard from '../components/PostCard';

function AllPosts() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const postsData = await appwriteService.getPosts();
                if (postsData) {
                    setPosts(postsData.documents);
                }
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();
    }, []);

    return (
        <div className=' mx-auto py-8 bg-gray-700'>
            <div className='flex flex-wrap -mx-4'>
                {posts.map((post) => (
                    <div key={post.$id} className='p-4 lg:w-1/4 md:w-1/2 sm:w-full'>
                    <PostCard $id={post.$id} title={post.title} featuredImage={post.img} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AllPosts;
