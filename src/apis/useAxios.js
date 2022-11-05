import { useEffect, useState } from 'react';
import axios from 'axios';

const useAxios = (url) => {

  const [data, setData] = useState({ user: {} }) 
  const [loading, setLoading] = useState (true)

    useEffect(() => {
        axios.get(url)
        .then(res => { console.log("Json data",res.data)
        setData(res.data)
        setLoading(false);
      }
      ).catch(err =>console.log(err))}, [])

      return{
        data , loading
      }
}

export default useAxios