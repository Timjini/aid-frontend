import React from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Container } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useEffect, useState} from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Counter from './Counter';


const baseUrl = `http://localhost:3001`||`https://hidden-eyrie-18402.herokuapp.com`;


export default function PostRequest () {

    const [data, setData] = useState ([])

  const [description, setDescription] = useState ('')
  const [address, setAddress] = useState ('')
  const [kind, setKind] = useState('')
  const [isLoading, setIsLoading] = useState(false);


  useEffect (() => {
    axios.get(`${baseUrl}/api/v1/asks`)
    .then (res => {
      setData(res.data)
      console.log(res.data)
    })
  }, [])

  const postData = async (e) => {
    if (!address.trim() || !description.trim()) {
      alert("address or description is invalid");
      return;
    }
    setIsLoading(false);
    try {
      //e.preventDefault();
      const response = await axios.post(`${baseUrl}/api/v1/asks`, {
        address,
        description,
        kind
      });
      if (response.status === 201) {
        alert(` You have created: ${JSON.stringify(response.data)}`);
        setIsLoading(false);
        setAddress('');
        setDescription('');
        setKind('');
      } else {
        throw new Error("An error has occurred");
      }
      setData([data,...response])
    } catch (error) {
      alert("An error has occurred");
      setIsLoading(false);
    }
  };

  const deleteData = async (id, e) => {
    let data = await axios.delete(`${baseUrl}/api/v1/asks/${id}`)
    setData();
  }



  const arr = data.map((data, index) => {
    return (
      <Container key={index}>
        <Card>
        <Card.Header>
          {data.user_id}
        </Card.Header>
          <Card.Body>
            <Card.Title>
            {data.address} <br/>
            {data.description}
            </Card.Title>
        <Card.Text>
           Kind: {data.kind}
        </Card.Text>
            <Counter />
            <Button variant="primary" type="submit" onClick={() => deleteData(data.id)} >Delete</Button>
          </Card.Body>
        </Card>
      </Container>

    )
  })


    return (
        <div>
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
                value= {kind}
                onChange={(e) => setKind(e.target.value)}
              >
                <option 
                    type="text" 
                    value="One time Task"
                    >One Time </option>
                <option   
                    type="text" 
                    value="Material Need"
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