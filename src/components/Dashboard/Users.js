import React, {useState, useEffect} from 'react';
import axios from 'axios';

const baseUrl = `http://localhost:3001/api/v1/requests/`


function Users () {

  const [fulfillments, setFulfillments] = useState ([])
  const [data, setData]= useState([]);
  const [text, setText] = useState([]);
  const [request_id, setRequest_id] = useState(21)

  useEffect (() => {
    axios.get(`http://localhost:3001/api/v1/requests/${request_id}/fulfillments`)
    .then (res => {
      setFulfillments(res.data)
      console.log(res.data)
    })
  }, [])

  const postData = async (e) => {
    axios
      .post(`http://localhost:3001/api/v1/requests/${request_id}/fulfillments`, {
        text,
        request_id,
      })
      .then((response) => {
        setData([...data,response.data]);
      });
  }


      return (
          <form>
            <input value={text} onChange={(e) => setText(e.target.value)} />
            <input value={request_id} onChange={(e) => setRequest_id(e.target.value)} />            
            <button onClick={postData}>Send</button>
          </form>
        )

}

export default Users; 