import React from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import Messages from './Messages';
import axios from 'axios'
import Form from 'react-bootstrap/Form';
import { useEffect, useState} from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { useUserState } from '../../contexts/user';



const baseUrl = 'http://localhost:3001/';
//const baseUrl = 'https://hidden-eyrie-18402.herokuapp.com/';
 
function Rooms() {
    
    const [body, setBody] = useState ([]);
    const { user } = useUserState();
    const { id } = useParams();


  const postBody = async (e) => {
    if (!body.trim()) {
      alert("address or description is invalid");
      return;
    }
    try {
      const response = await axios.post(`${baseUrl}api/v1/rooms/${id}/tweets`, {
        body,
      });
      if (response.status === 201) {
        alert(` You have created: ${JSON.stringify(response.body)}`);
        setBody('');
      } else {
        throw new Error("An error has occurred");
      }
      setBody([body,...response])
    } catch (error) {
      alert("An error has occurred");
    }
  };


  return (
    <Container>
    <>
    <Messages />
    <Form>
      <Row className='p-2'>
        <Col sm={8} md={8} className='p-2'>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="message ..."
              value={body}
              onChange={(e) => setBody(e.target.value)} />
          </Form.Group>
        </Col>
      <Col sm={4} md={4} className='p-2' >
        <Button type="submit" onClick={postBody}>Send</Button>
      </Col>
      </Row>
    </Form></>
    </Container>
  )

}

export default Rooms

