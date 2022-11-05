import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {user} from '../../contexts/user'
import { useUserState } from '../../contexts/user';

const baseUrl = `http://localhost:3001/api/v1/fulfillments/`


function Fulfillment (match) {

    const [data, setData]= useState([]);
    const [text, setText] = useState([]);
    const [request_id, setRequest_id] = useState('1');

    useEffect(() => {
        fetchRequest();
    }, []);
    const fetchRequest = () => {
      axios
        .get(
          `${baseUrl}`
        )
        .then((res) => {
          setData(res.data);
          console.log(res.data);
        })
        .catch((err) => console.log(err));
    };

  const postData = async (e) => {
    axios
      .post(`http://localhost:3001/api/v1/fulfillments`, {
        text,
        request_id
      })
      .then((response) => {
        setData([...data,response.data]);
      });
  }


      return (
        <>
          <form>
            <input value={text} onChange={(e) => setText(e.target.value)} />
            <input value={request_id} onChange={(e) => setRequest_id(e.target.value)} />
            <button onClick={postData}>Send</button>
          </form>
          </>
        )

}

export default Fulfillment; 