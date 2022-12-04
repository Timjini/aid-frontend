import React,{ useEffect, useState,useRef} from 'react';
import axios from "axios";
import {useUserState} from '../../contexts/user'
import { API_REQUESTS } from '../../constant';
import { API_FULFILLMENTS } from '../../constant';
import { Avatar, Flex, Text, Tooltip, Button, Input, Container, 
   Drawer,DrawerOverlay,DrawerContent,DrawerHeader,DrawerBody,
   useDisclosure, Divider,TableContainer,Table, Thead,Tr,Tbody,Th,Td  } from "@chakra-ui/react";
import { Link, useHistory } from 'react-router-dom';


function RequestDetail({match}) {
  const AlwaysScrollToBottom = () => { 
    const elementRef = useRef();
    useEffect(() => elementRef.current.scrollIntoView());
    return <div ref={elementRef} />;
    };
  
  const [request, setRequests] = useState({ user: {} });
  const [text, setText] = useState([]);
  const [fulfillment, setFulfillment] = useState({ user: {} });
  const [data, setData] = useState({user: {}});
  const [request_id, setRequest_id] = useState(match.params.id);
  const { user } = useUserState();
  const [placement, setPlacement] = useState("right");

  const { isOpen, onOpen, onClose } = useDisclosure()


  

  useEffect(() => {
    fetchRequest();
}, []);
const fetchRequest = () => {
  axios
    .get(
      `${API_REQUESTS}/${match.params.id}`
    )
    .then((res) => {
      setRequests(res.data);
      console.log(res.data);
    })
    .catch((err) => console.log(err));
};

useEffect(() => {
    fetchData();
}, []);
const fetchData = () => {
  axios
    .get(
      `${API_FULFILLMENTS}`
    )
    .then((res) => {
      setData(res.data);
      console.log(res.data);
    })
    .catch((err) => console.log(err));
};


const postData = async (e) => {
  //e.preventDefault();
axios
  .post(`${API_FULFILLMENTS}`, {
    request_id
  })
  .then((response) => {
    setData([...data,response.data]);
    setText('');
    console.log(response);
    window.location.reload(false);
   })   
  }


  return (
    <>
    <Container className='p-5' style={{backgroundColor:'#f5f5f5'}}>
      <h1 className='pb-2'style={{fontWeight:"600", fontSize:"30px"}}>Request Details </h1>
      <h5 className="card-title"><span style={{fontWeight:"600"}}> Help : </span>{request.user?.username}</h5>
      <br/>
      <Button colorScheme='blue' onClick={onOpen}>
        Check Request here
      </Button>
    </Container>
      <Drawer placement={placement} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth='1px'>REQUEST</DrawerHeader>
          <DrawerBody>
                      <p className="card-text"><span style={{fontWeight:"600"}}> Description :</span>{request.description}</p>
                      <p className="card-text"><span style={{fontWeight:"600"}}> Address :</span>{request.address}</p>
                      <p className="card-text"><span style={{fontWeight:"600"}}> Kind :</span> {request.kind}</p>
                      <Divider />
                      <h5 className="card-title"><span style={{fontWeight:"600"}}> Requested By :</span>{request.user?.username}</h5>
                      <p className="card-text"><span style={{fontWeight:"600"}}> Contact Email :</span>{request.user?.email}</p>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      <Container className='p-5' >
        {request.fulfillments?.map((fulfillment) => (
          <TableContainer key={fulfillment.id}>
          <Table size='sm'>
            <Thead>
              <Tr>
                <Th>Fulfiller:</Th>
                <Th>Fulfiller email:</Th>
                <Th isNumeric></Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr key={fulfillment.id}>
                <Td>{fulfillment.user?.username}</Td>
                <Td>{fulfillment.user?.email}</Td>
                <Td isNumeric><Link to={`/fulfillments/${fulfillment.id}`}>Chat</Link></Td>
              </Tr>
              </Tbody>
          </Table>
        </TableContainer>
          ))}
      </Container>
  
    
    </>
  );
};


export default RequestDetail

