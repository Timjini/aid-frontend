import React,{ useEffect, useState} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';


const baseUrl = `http://localhost:3001`

export default function MyRequests({currentUser}){
    const [data, setData] = useState ([])
  

    useEffect(() => {
      fetch(`/requests/${currentUser.id}`)
      .then((r) =>{
        if(r.ok){
            r.json().then((data)=>setData(data))
        }
    })
  }, [])
  return (
    <><div>MyRequests</div><div>
          {data.map(data  => 
          <ul>
              <li key={data.id}>
                 {data.description}
              </li>
          </ul>

          )}
      </div></>
  )
}
