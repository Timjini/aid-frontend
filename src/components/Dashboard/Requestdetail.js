import React,{ useEffect, useState,useRef} from 'react';
import axios from "axios";
import {useUserState} from '../../contexts/user'
import { API_REQUESTS } from '../../constant';
import { API_FULFILLMENTS } from '../../constant';
import { Avatar, Flex, Text, Tooltip, Button, Input, Container, 
   Drawer,DrawerOverlay,DrawerContent,DrawerHeader,DrawerBody,
   useDisclosure, Divider,TableContainer,Table, Thead,Tr,Tbody,Th,Td,
   Accordion,AccordionItem,AccordionButton,AccordionIcon,AccordionPanel,Box,Badge } from "@chakra-ui/react";
import { Link, useHistory } from 'react-router-dom';
import Card from 'react-bootstrap/Card';

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
    })
    .catch((err) => console.log(err));
};

// delete request
const deleteRequest = async (id) => {
  try {
    const response = await axios
      .delete(`${API_REQUESTS}/${id}`)
    const data = response.data
    console.log(data)
    fetchRequest();
  } catch(error) {
    alert ( " Please Try later ")
  }
}


  return (
    <>
    <Container className='p-5' style={{backgroundColor:'#f5f5f5'}}>
      <h1 className='pb-2'style={{fontWeight:"600", fontSize:"30px"}}>Request Details </h1>
      <h5 className="card-title"><span style={{fontWeight:"600"}}> Help : </span>{request.user?.username}</h5>
      <br/>
      <Button colorScheme='teal' onClick={onOpen}>
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

      <Container className='p-1 RequestCards mt-2' >
      <h2 style={{fontWeight:"600"}}>List of Fulfillers</h2>
        {request.fulfillments?.map((fulfillment) => (
            <Flex key={fulfillment.id} colorScheme="teal" className='p-1'>
              <Card body>
              <span style={{fontWeight:"600"}}> Fulfiller:</span>
                {fulfillment.user?.username} <br/>
                <span style={{fontWeight:"600"}}>Request By :</span>
                  {request.user?.username}<br/>
                  <Link to={`/fulfillments/${fulfillment.id}`} className="mt-2">
                    {/* disable button is username doesnt equal fulfillment username or not request username */}
                    <Button colorScheme='teal' disabled={user.username !== fulfillment.user?.username && user.username !== request.user?.username}>
                      Check Fulfillment
                    </Button>
                    {/* <Button colorScheme='teal' disabled={user.username !== fulfillment.user?.username}>
                      Send a Message
                    </Button> */}
                </Link>
              </Card>
            </Flex>
          ))}
      </Container>
  
    
    </>
  );
};


export default RequestDetail

