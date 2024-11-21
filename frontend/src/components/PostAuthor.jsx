import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import ReactTimeAgo from 'react-time-ago'
import TimeAgo from 'javascript-time-ago'

import en from 'javascript-time-ago/locale/en.json'
import ru from 'javascript-time-ago/locale/en.json'

TimeAgo.addDefaultLocale(en)
TimeAgo.addLocale(ru)

export const PostAuthor = ({authorID, createdAt}) => {
    
    const [author,setAuthor]=useState({})
    useEffect(()=>{
        const getAuthor = async () =>{
            try{
                if (!authorID) {
                    console.log('Author ID is undefined');
                    return
                }
                const baseUrl = process.env.REACT_APP_BASE_URL || 'http://localhost:5000/api'
                const response = await axios.get(`${baseUrl}/users/${authorID}`)
                setAuthor(response?.data)
            }catch(error){
                console.log(error);
            }
        }
        getAuthor()
    },[authorID])
    const base_Ass_Url = process.env.REACT_APP_ASSETS_URL || 'http://localhost:5000'
    return (

        <Link to={`/posts/users/${authorID}`}>
            <div className='flex mt-3'>
                <div>
                    <img src={`${base_Ass_Url}/uploads/${author?.avatar}`} alt="author" className='rounded-full w-12' />
                </div>
                <div className='ml-2 mt-1 text-sm'>
                    <h1 className='font-semibold'>By:{author?.name}</h1>
                    <p><ReactTimeAgo date={new Date(createdAt)} locale='en-US'/></p>
                </div>
            </div>
        </Link>

    )
}
