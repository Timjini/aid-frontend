import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { API_FULFILLMENTS } from '../../constant';




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
          `${API_FULFILLMENTS}`
        )
        .then((res) => {
          setData(res.data);
          console.log(res.data);
        })
        .catch((err) => console.log(err));
    };

  const postData = async (e) => {
    axios
      .post(`${API_FULFILLMENTS}`, {
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