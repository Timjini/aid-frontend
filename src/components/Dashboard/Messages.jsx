import React from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import useAxios from '../../apis/useAxios';
import { useEffect, useState } from 'react';
import axios from 'axios';
 
function Messages() {
    const [data, setData] = useState ([])
  
    useEffect (() => {
        axios.get('http://localhost:3001/api/v1/rooms/1/messages/1')
        .then (res => {
          setData(res.data)
          console.log(res.data)
        })
      }, [])

  return (
      
    <div className='p-5'>
        <h2> Messages</h2>
        {data && (
        <>
          <h2> {data.body}</h2>
        </>
      )}

    </div>
  );
}
export default Messages