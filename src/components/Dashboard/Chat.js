import React,{useEffect, useState,useRef} from 'react'
import { Avatar, Flex, Text, Tooltip, Button, Input, Container} from "@chakra-ui/react";
import {useUserState} from '../../contexts/user';
import { API_FULFILLMENTS } from '../../constant';
import {API_MESSAGES}   from '../../constant';
import axios from 'axios';

 

function Chat({match}) {
    const AlwaysScrollToBottom = () => { 
        const elementRef = useRef();
        useEffect(() => elementRef.current.scrollIntoView());
        return <div ref={elementRef} />;
        };
    const [body, setBody] = useState("");
    const [messages, setMessages] = useState([]);
    const { user } = useUserState();
    const [fulfillment, setFulfillment] = useState({ user: {} });
    const [data, setData] = useState({user: {}});
    const [fulfillment_id, setFulfillment_id] = useState(match.params.id);

    useEffect(() => {
        fetchFulfillment();
    }, []);
    const fetchFulfillment = () => {
      axios
        .get(
          `${API_FULFILLMENTS}/${match.params.id}`
        )
        .then((res) => {
          setFulfillment(res.data);
        })
        .catch((err) => console.log(err));
    };

    const postData = async (e) => {
        e.preventDefault();
      axios
        .post(`${API_MESSAGES}`, {
          body,
          fulfillment_id
        })
        .then((response) => {
          setData([...data,response.data]);
          setBody('');
          window.location.reload(false);
         })   
        }

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
      axios
        .get(
          `${API_MESSAGES}`
        )
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => console.log(err));
    };


  return (

    <Container style={{ paddingTop: '50px' }}>
        <span style={{ fontWeight: "600", fontSize: "25px", paddingBottom: '20px' }}>Leave a Message here.</span>
        <Flex w="100%" h="80%" overflowY="scroll" flexDirection="column" p="3" style={{ backgroundColor: '#f1ffff',minHeight: "50vh" }}>
          {fulfillment.messages?.map((message) => {
            if (message.user?.username === user.username) {
              return (
                <Flex key={message.id} w="100%" justify="flex-end">
                  <Flex
                    bg="black"
                    color="white"
                    minW="100px"
                    maxW="350px"
                    my="1"
                    p="3"
                  >
                    <Tooltip label={message.user?.username} bg='red.600'>
                      <Text>{message.body}</Text>
                    </Tooltip>
                  </Flex>
                </Flex>
              );
            } else {
              return (
                <Flex key={message.id} w="100%">
                  <Avatar size="sm" name={message.user?.username} src={message.user?.avatar} />
                  <Flex
                    bg="gray.100"
                    color="black"
                    minW="100px"
                    maxW="350px"
                    my="1"
                    p="3"
                  >
                    <Tooltip label={message.user?.username} bg='red.600'>
                      <Text>{message.body} </Text>
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
            } }
            value={body}
            onChange={(e) => setBody(e.target.value)} />
          <Input className='form-control' type="hidden" value={fulfillment_id} onChange={(e) => setFulfillment_id(e.target.value)} />
          <Button colorScheme="blue"
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
  )
}

export default Chat