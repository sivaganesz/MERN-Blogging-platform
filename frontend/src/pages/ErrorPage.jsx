import React from 'react'
import { Link } from 'react-router-dom'

export const ErrorPage = () => {
  return (
    <>
      <div className='mt-[20%] mx-auto '>
        <div className=' items-center justify-center flex'>
        <Link to='/'><button className='bg-violet-500 p-2 font-semibold rounded-md hover:scale-105 hover:bg-slate-600 text-white'>GO BACK HOME</button></Link>
        </div>
        <h1 className='mt-10 text-3xl font-semibold text-center'>PAGE NOT FOUND</h1>

      </div>
    </>
  )
}
