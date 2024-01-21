import React, { useEffect, useState } from 'react';
import appwriteService from "../appwrite/conf.js";
import { Link } from 'react-router-dom';

function PostCard({ $id, title, featuredImage }) {
  const [filePreview, setFilePreview] = useState(null);

  useEffect(() => {
    async function fetchFilePreview() {
      try {
        const imagePreview = await appwriteService.getFilePreview(featuredImage);
        setFilePreview(imagePreview.href);
      } catch (error) {
        console.error('Error fetching file preview:', error);
      }
    }

    fetchFilePreview();
  }, [featuredImage]);

  return (
    <Link to={`/post/${$id}`}>
      <div className='w-full bg-gray-100 rounded-xl p-4 '>
        <div className='w-full flex justify-center mb-4'>
          {filePreview && (
            <img src={filePreview} alt={title} className='rounded-xl' />
          )}
        </div>
        <h2 className='text-xl text-center font-bold'>{title}</h2>
      </div>
    </Link>
  );
}

export default PostCard;
