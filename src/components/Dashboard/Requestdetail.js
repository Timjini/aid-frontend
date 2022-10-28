import React,{ useEffect, useState} from 'react';
import axios from 'axios';
import {Link, useParams} from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Container } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const baseUrl = `http://localhost:3001`

function RequestDetail() {
  const [data, setData] = useState ([])
  const [description, setDescription] = useState ('')
  const [address, setAddress] = useState ('')
  //const [situation, setSituation] = useState(1)
  const [kind, setKind] = useState('onetime')
  const [isLoading, setIsLoading] = useState(false);
    
    console.log( "id" + data.id)

    useEffect (() => {
        axios.post(`${baseUrl}/api/v1/requests`)
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
            //situation
          });
          if (response.status === 201) {
            alert(` You have created: ${JSON.stringify(response.data)}`);
            setIsLoading(false);
            setAddress('');
            setDescription('');
            //setSituation();
            setKind({})
          } else {
            throw new Error("An error has occurred");
          }
          setData([data,...response])
        } catch (error) {
          alert("You have reached maximum requests");
          setIsLoading(false);
        }
      };

      const changeKind = (kind) =>{
        setKind(kind)
      }
      const changeSituation = (situation) => {
        //setSituation(situation)
      }


  return (
    <>          
    
    <Container classNameName="center mb-5 mt-5">
    <Form>
      <Row>
        <Col>
        <Form.Group classNameName="mb-3">
          <Form.Label htmlFor="inputText">Address</Form.Label>
          <Form.Control
              type="text" 
              placeholder="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
          />
        </Form.Group>
        </Col>
        <Form.Group classNameName="mb-3">
            <Form.Label htmlFor="inputText">Description</Form.Label>
              <Form.Control
                type="text" 
                placeholder="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
               />
        </Form.Group>

        <Form.Group classNameName="mb-3">
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
    </>
  )
}

export default RequestDetail