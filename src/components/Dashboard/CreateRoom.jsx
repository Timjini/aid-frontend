import React,{useEffect, useState} from 'react'
import axios from 'axios';


const baseUrl1 = 'http://localhost:3001/api/v1/rooms';

function CreateRoom() {
    const [data, setData] = useState({})
    const [request_id, setRequest_id] = useState(2)

    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = () => {
      axios
        .get(
          `${baseUrl1}`
        )
        .then((res) => {
          setData(res.data);
          console.log(res.data);
        })
        .catch((err) => console.log(err));
    };
    
    const postData = async (e) => {
    axios
      .post(`${baseUrl1}`, {
        name: e.target.name.value,
        request_id,
      })
      .then((response) => {
        setData([...data,response.data]);
      });
    }
  return (
    <div>
    <form>
        <input type="text" name="name" />
        <input type="text" name="request_id" value={request_id} onChange={(e) => setRequest_id(e.target.value)} />
        <button onClick={postData}>Create Room</button>
    </form>
    </div>
  )
}

export default CreateRoom