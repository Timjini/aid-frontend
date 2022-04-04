import React from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Container } from 'react-bootstrap';
import Location from './Location';
import Form from 'react-bootstrap/Form';
import { useEffect, useState} from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Requests(){
  const [data, setData] = useState ([])

  const [description, setDescription] = useState ('')
  const [address, setAddress] = useState ('')
  const [isLoading, setIsLoading] = useState(false);


  useEffect (() => {
    axios.get('https://hidden-eyrie-18402.herokuapp.com/api/v1/requests')
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
    setIsLoading(true);
    try {
      const response = await axios.post(`https://hidden-eyrie-18402.herokuapp.com/api/v1/demands`, {
        address,
        description,
      });
      if (response.status === 201) {
        alert(` You have created: ${JSON.stringify(response.data)}`);
        setIsLoading(false);
        setAddress('');
        setDescription('');
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
    let data = await axios.delete(`https://hidden-eyrie-18402.herokuapp.com/api/v1/demands/${id}`)
    setData();
  }



  const arr = data.map((data, index) => {
    return (
      <Container>
        <Card>
        <Card.Header key={data.id}>
          {data.id}
        </Card.Header>
          <Card.Body>
            <Card.Title>
            {data.address}
            </Card.Title>
        <Card.Text>
        {data.description}
        </Card.Text>
            <Button variant="contained">Contact</Button>
            <Button variant="primary" type="submit" onClick={() => deleteData(data.id)} >Delete</Button>
          </Card.Body>
        </Card>
      </Container>

    )
  })

  return (
      <>
      <Location />
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
            <Col>
            <Form.Group className="mb-3">
                <Form.Label htmlFor="inputText">Description</Form.Label>
                  <Form.Control
                    type="text" 
                    placeholder="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                   />
            </Form.Group>
            </Col>
            
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

      </>
  )
}

export default Requests;