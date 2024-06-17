import React from 'react';
import { Link } from 'react-router-dom';
import { PostAuthor } from './PostAuthor';

export const PostItems = ({ PostId, thumbnail, title, category, desc, authorID,createdAt }) => {
  const postTitle = title.length > 25 ? title.substr(0, 25) + '...' : title;
  const baseUrl = process.env.REACT_APP_ASSETS_URL || 'http://localhost:5000'
  return (
    <div className="max-w-xs mx-auto bg-white rounded-lg shadow-md overflow-hidden p-4">
      <article className='flex flex-col'>
        <div>
          <img src={`${baseUrl}/uploads/${thumbnail}`} alt={title} className='w-full h-48 object-cover rounded-t-lg hover:scale-105' />
        </div>
        <div className='mt-3'>
          <Link to={`/posts/${PostId}`}>
            <h3 className='text-lg font-semibold text-gray-900  hover:text-indigo-600'>{postTitle}</h3>
          </Link>
          <p className='mt-2 leading-6 line-clamp-4 text-gray-600' dangerouslySetInnerHTML={{__html:desc}}/>
          <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
            <PostAuthor authorID={authorID} createdAt={createdAt} />
            <Link to={`/posts/categories/${category}`} className='hover:bg-gray-300 bg-gray-300 text-black p-1 px-2 rounded'>
              {category}
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
};
