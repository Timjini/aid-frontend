import React, {useState, useEffect} from 'react';
import axios from 'axios';

const baseUrl = `http://localhost:3001`||`https://hidden-eyrie-18402.herokuapp.com`;


function Users () {

    const [data, setData] = useState ('')

    useEffect (() => {
        axios.get(`${baseUrl}/api/v1/user/1`)
        .then (res => {
          setData(res.data)
          console.log("users" , res.data)
        })
      }, [])

      return (
          data
      )

}

export default Users; 