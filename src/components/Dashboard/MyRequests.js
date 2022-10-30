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

    const deleteData = async (id, e) => {
      //e.preventDefault();
      let request = await axios.delete(`${baseUrl}/17`)
      setRequests(); 
    }

    // const myRequests = () => {
    //   if(requests.data.array === 0)
    //   return <h1>No requests</h1>
    // }


  return (
    <><h1 className='display-5 p-2'>My Requests</h1>
      <div>
          {requests?.map((request,index)  => {
             if (user.username === request.user.username)
             return(
            <Container className="p-3" key={user}>
              <Card className="text-center">
                <Card.Header>{request.user.username} // {request.id}</Card.Header>
                <Card.Body>
                  <Card.Title>{request.address}</Card.Title>
                  <Card.Text>
                   {request.description}
                  </Card.Text>
                  <Button variant="primary" onClick={deleteData}>Delete</Button>
                </Card.Body>
                <Card.Footer className="text-muted">{request.situation}</Card.Footer>
              </Card>
            </Container>
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
