import React from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Container } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useEffect, useState} from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../styles/Home.css';
//import { useUserState } from '../../contexts/user';
import {Link} from 'react-router-dom'
import { useUserState } from '../../contexts/user';





// const baseUrl = `http://localhost:3001`||`https://hidden-eyrie-18402.herokuapp.com`;
const baseUrl = `http://localhost:3001`;


export default function PostRequest () {
  const { user } = useUserState();

  const [data, setData] = useState ([])
  const [description, setDescription] = useState ('')
  const [address, setAddress] = useState ('')
  const [situation, setSituation] = useState('pending')
  const [kind, setKind] = useState('onetime')
  const [isLoading, setIsLoading] = useState(false);



  useEffect (() => {
    axios.get(`${baseUrl}/api/v1/requests`)
    .then (res => {
      setData(res.data)
      console.log(res.data)
    })
  }, [])

  const postData = async (e) => {
    e.preventDefault();
    if (!address.trim() || !description.trim()) {
      alert("address or description is invalid");
      return;
    }
    setIsLoading(false);
    try {
      //
      const response = await axios.post(`${baseUrl}/api/v1/requests`, {
        address,
        description,
        kind,
        situation
      });
      if (response.status === 201) {
        alert(` You have created: ${JSON.stringify(response.data)}`);
        setIsLoading(false);
        setAddress('');
        setDescription('');
        setSituation();
        setKind({})
      } else {
        throw new Error("An error has occurred");
      }
      setData([data,...response])
    } catch (error) {
      alert("An error has occurred");
      setIsLoading(false);
    }
  };

  const changeKind = (kind) =>{
    setKind(kind)
  }
  const deleteData = async (id, e) => {
    //e.preventDefault();
    let data = await axios.delete(`${baseUrl}/api/v1/requests/${id}`)
    setData(); 
  }

  const changeSituation = (situation) => {
    setSituation(situation)
  }
  data.sort((a, b) => {
    return new Date(b.created_at) - new Date(a.created_at); // descending
  })
const requests = data.length;




  const arr = data.map(data => {
    return (
      <>
      <div key={data.id} className="cardscontainer">

      <Container className="p-3">
        <Card>
        <Card.Header>
         <h4><Link to={`/requests/${data.id}`}>Request Id :{data.id}</Link> // {data.user.email}</h4>
        </Card.Header>
          <Card.Body>
            <Card.Title>
            {data.address} <br/>
            {data.description}
            </Card.Title>
        <Card.Text>
           Kind: {data.kind}
        </Card.Text>
            Situation : {data.situation}<br/>      {data.user_id} <br/>
            <Button variant="primary" type="submit" onClick={() => deleteData(data.id)} >Delete</Button>
          </Card.Body>
        </Card>
      </Container>

      </div>
      </>
    )
  })


    return (
        <div>
      <h3>Number of Unfilfilled requests : <span>{requests} // {user.email}</span></h3>
      
        <Container className="center mb-5 mt-5">
        <Form>
          <Row>
            <Col>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="inputText">Address</Form.Label>
              <Form.Control
                  type="text" 
                  placeholder="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
              />
            </Form.Group>
            </Col>
            <Form.Group className="mb-3">
                <Form.Label htmlFor="inputText">Description</Form.Label>
                  <Form.Control
                    type="text" 
                    placeholder="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                   />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label htmlFor="">Choose from the list</Form.Label>
              <Form.Select id=""
              value={kind}
              onChange={(event) => changeKind(event.target.value)}
              >
                <option 
                    type="text" 
                    value = "onetime"
                    >One Time </option>
                <option   
                    type="text" 
                    value= "financial"
                    >Financial Request</option>
              </Form.Select>
            </Form.Group>
          </Row>
          <Col md={{ span: 4, offset: 4 }} >
          <Button type="submit" onClick={postData}>Submit</Button>
          </Col>
        </Form>
        </Container>
      <Form>
              <Container>
              {arr}
              </Container>
      </Form>
      </div>
    )
}