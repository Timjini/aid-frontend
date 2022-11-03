import React, {useState, useEffect} from 'react';
import axios from 'axios';

const baseUrl = `http://localhost:3001/api/v1/requests/`


function Fulfillment (match) {

    const [request, setRequest] = useState ({})
    const [data, setData]= useState([]);
    const [text, setText] = useState([]);

    useEffect(() => {
        fetchRequest();
    }, []);
    const fetchRequest = () => {
      axios
        .get(
          `${baseUrl}/${match.params.id}`
        )
        .then((res) => {
            setRequest(res.data);
          console.log(res.data);
        })
        .catch((err) => console.log(err));
    };

  const postData = async (e) => {
    axios
      .post(`http://localhost:3001/api/v1/requests/${match.params.id}/fulfillments`, {
        text,
      })
      .then((response) => {
        setData([...data,response.data]);
      });
  }


      return (
        <>
        {request.id}
          <form>
            <input value={text} onChange={(e) => setText(e.target.value)} />
            <button onClick={postData}>Send</button>
          </form>
          </>
        )

}

export default Fulfillment; 