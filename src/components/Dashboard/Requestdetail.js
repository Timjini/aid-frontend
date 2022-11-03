import React,{ useEffect, useState} from 'react';
import axios from "axios";
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import { setAuthHeaders } from '../../apis/axios';




const baseUrl = `http://localhost:3001/api/v1/requests`

function RequestDetail({match}) {
  const [request, setRequests] = useState({ user: {} });
  const [fulfillment, setFulfillments] = useState({});
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
      setRequests(res.data);
      console.log(res.data);
    })
    .catch((err) => console.log(err));
};


const handleSubmit = async (e) => {
  //e.preventDefault();
  const newfulfillment = {text}
  try{
      const response = await axios.post(`${baseUrl}/${match.params.id}/fulfillments`, newfulfillment);
      setAuthHeaders();
      const allFullfilments = [...fulfillment, response.data];
      setFulfillments(allFullfilments);
      setText('');
  } catch (err) {
      console.log(`Error: ${err.message}`);
  }
}


  return (
    <>  
            <Container className="p-5">
              <Card key={request.id}>
                            <Card.Header>{request.user?.username} {request.fullfilments?.text}</Card.Header>
                            <Card.Body>
                            <Card.Title>
                            <span style={{fontWeight : "600"}}>Address</span> {request.address}</Card.Title>
                            <Card.Text>
                               <span style={{fontWeight : "600"}}>Description</span> : {request.description}<br/>
                               <span style={{fontWeight : "600"}}>Type of Request</span> : {request.kind}
                            </Card.Text>
                            <form>
                              <input value={text} onChange={(e) => setText(e.target.value)} />
                              <button onClick={handleSubmit}>Send</button>
                            </form>
                            </Card.Body>
                    </Card>
            </Container>  
       
    </>
  );
};


export default RequestDetail