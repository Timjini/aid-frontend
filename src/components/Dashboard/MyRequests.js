import React,{ useEffect, useState} from 'react';
import axios from 'axios';
import { useUserState } from '../../contexts/user';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';



const baseUrl = `http://localhost:3001/api/v1/requests`

export default function MyRequests(){

    const {user} = useUserState ();
    console.log(user)
  
    const [requests, setRequests] = useState ([])

    useEffect ((e) => {
        getRequests();
    }, [])

    const getRequests = async (e) => {
      try {
        const response = await axios
          .get(`${baseUrl}`)
  
        const data = response.data
  
        setRequests(data.reverse())
        console.log(response)
  
      } catch(error) {
        console.log(error)
      }
    }



  return (
    <><h1 className='display-5 p-2'>My Requests</h1>
      <div>
          {requests?.map((request,index)  => {
             if (user.username === request.user.username)
             return(
          <div key={request.id}>
            <Container className="p-3" >
              <Card className="text-center">
                <Card.Header><h2>{request.user.username}</h2> <h5>{request.id}</h5> </Card.Header>
                <Card.Body>
                  <Card.Title>{request.address}</Card.Title>
                  <Card.Text>
                   {request.description}
                  </Card.Text>
                </Card.Body>
                <Card.Footer className="text-muted">{request.situation} <br/> <p>This request will be deleted in 24 hours.</p></Card.Footer>
              </Card>
            </Container>
            </div>
             )
             else 
            return (
              <>
              </>
            )
          })}
      </div>
      </>
  )
}
