import React from 'react'
import { Link } from 'react-router-dom'

const categories = [
  {
    id: 1,
    name: 'Art',
    link: 'posts/categories/Art',
  },
  {
    id: 2,
    name: 'Business',
    link: 'posts/categories/Business',
  },
  {
    id: 3,
    name: 'Education',
    link: 'posts/categories/Education',
  },
  {
    id: 4,
    name: 'Weather',
    link: 'posts/categories/Weather',
  },
  {
    id: 5,
    name: 'Investment',
    link: 'posts/categories/Investment',
  },
  {
    id: 6,
    name: 'Agriculture',
    link: 'posts/categories/Agriculture',
  },
  {
    id: 7,
    name: 'Entertainment',
    link: 'posts/categories/Entertainment',
  },
  {
    id: 8,
    name: 'Uncategorized',
    link: 'posts/categories/Uncategorized',
  },
]

export const Footer = () => {
  return (
    <footer className='bg-gray-900 mt-10 pt-16 mx-auto pb-10 w-full'>
      <ul className='flex flex-wrap gap-5 items-center justify-center'>
        {categories.map((data) => (
          <li key={data.id} className='flex justify-center'>
            <Link to={data.link}>
              <div className='bg-gray-600 text-white p-2 rounded hover:bg-white hover:text-black'>
                {data.name}
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <div className="items-center justify-center flex mt-10 text-gray-300">
        <small>All Right Reserved &copy; Copyright, SivaGanesz</small>
      </div>
    </footer>
  )
}
