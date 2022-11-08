import React,{ useEffect, useState,useRef} from 'react';
import axios from "axios";
import {useUserState} from '../../contexts/user'
import { API_REQUESTS } from '../../constant';
import { API_FULFILLMENTS } from '../../constant';
import { Avatar, Flex, Text, Tooltip, Button, Input, Container, 
   Drawer,DrawerOverlay,DrawerContent,DrawerHeader,DrawerBody,useDisclosure, Divider,  } from "@chakra-ui/react";
import { ActionCable} from 'react-actioncable-provider';



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

// const loadtext = () => {
//   const response =  axios.get(API_FULFILLMENTS);
//   setText(response );
// }

// const updateDevicePosition = async (e) => {
//   e.preventDefault();
//   try {
//     const result = await fetch(`${API_FULFILLMENTS}`)
//     const data = await result.json()
//     setState(data.x)
//   } catch (e) {
//     console.error(e)
//   }
//   clearTimeout(timer)
//   setTimer(setTimeout(updateDevicePosition, 200))
// }

// useEffect(() => {
//   if (!isMounted) {
//      updateDevicePosition()
//      setIsMounted(true)
//   }
// })

const postData = async (e) => {
  //e.preventDefault();
axios
  .post(`${API_FULFILLMENTS}`, {
    text,
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
      <h5 className="card-title"><span style={{fontWeight:"600"}}> Help :</span>{request.user?.username}</h5>

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
  
      <Container style={{paddingTop: '50px'}} >
        <span style={{fontWeight:"600", fontSize:"25px",paddingBottom: '20px'}}>Leave a Message here.</span>
        <Flex w="100%" h="80%" overflowY="scroll" flexDirection="column" p="3" style={{backgroundColor:'#f1ffff'}}>
                {request.fulfillments?.map((fulfillment) => {
                  if (fulfillment.user?.username === user.username) {
                    return (
                      <Flex key={fulfillment.id} w="100%" justify="flex-end">
                        <Flex
                          bg="black"
                          color="white"
                          minW="100px"
                          maxW="350px"
                          my="1"
                          p="3"
                        >
                          <Tooltip label={fulfillment.user?.username} bg='red.600'>
                          <Text>{fulfillment.text}</Text>
                    </Tooltip>
                        </Flex>
                      </Flex>
                    );
                  } else {
                    return (
                      <Flex key={fulfillment.id} w="100%">
                          <Avatar size="sm" name={fulfillment.user?.username} src={fulfillment.user?.avatar} />
                        <Flex
                          bg="gray.100"
                          color="black"
                          minW="100px"
                          maxW="350px"
                          my="1"
                          p="3"
                        >
                      <Tooltip label={fulfillment.user?.username} bg='red.600'>
                          <Text>{fulfillment.text} </Text>
                    </Tooltip>
                        </Flex>
                      </Flex>
                    );
                  }
                })}
                <AlwaysScrollToBottom />
	        </Flex>
                <Flex w="100%" mt="5">
                  <Input
                    placeholder="Type Something..."
                    borderRadius="5px"
                    _focus={{
                      border: "1px solid black",
                    }}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        postData();
                      }
                    }}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                  />
                  <Input className='form-control'  type="hidden" value={request_id} onChange={(e) => setRequest_id(e.target.value)} />
                  <Button   colorScheme="blue"
                    color="white"
                    borderRadius="5px"
                    _hover={{
                      bg: "white",
                      color: "black",
                      border: "1px solid black",
                    }} 
                    onClick={postData} className="btn btn-primary">Send</Button>
                </Flex>
      </Container>
    </>
  );
};


export default RequestDetail



{/* <div className="container p-5" key={request.id}>
<div className="row">
<div className="col-md-6">
  <div className="card">
    <div className="card-body">
      <h3 className="card-title">REQUEST</h3>
      <p className="card-text"><span style={{fontWeight:"600"}}> Description :</span>{request.description}</p>
      <p className="card-text"><span style={{fontWeight:"600"}}> Address :</span>{request.address}</p>
      <p className="card-text"><span style={{fontWeight:"600"}}> Kind :</span> {request.kind}</p>
    </div>
  </div>
</div>
<div className="col-md-6">
  <div className="card">
    <div className="card-body">
      <h5 className="card-title">{request.user?.username}</h5>
      <p className="card-text">{request.user?.email}</p>
    </div>
  </div> 
          </div>
        </div>
      </div>
    
    
     <form className='pt-2'>
                  <input className='form-control' value={text} onChange={(e) => setText(e.target.value)} />
                  <input className='form-control'  type="hidden" value={request_id} onChange={(e) => setRequest_id(e.target.value)} />
                  <button onClick={postData} className="btn btn-primary mt-2">Send</button>
                </form>*/}