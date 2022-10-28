import React,{ useEffect, useState} from 'react';
import axios from 'axios';


const baseUrl = `http://localhost:3001`

export default function MyRequests(){
  
    const [data, setData] = useState ([])

    useEffect (() => {
      axios.get(`${baseUrl}/api/v1/requests/11`)
      .then (res => {
        setData(res.data)
        console.log(res.data)
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
