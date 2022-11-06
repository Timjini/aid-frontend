import React, { useEffect, useRef, useState } from "react";
import { Avatar, Flex, Text, Tooltip } from "@chakra-ui/react";
import axios from "axios";
import { useUserState } from "../../contexts/user";

const baseUrl = 'http://localhost:3001/api/v1' || "https://hidden-eyrie-18402.herokuapp.com/api/v1";


const Messages = () => {
  const AlwaysScrollToBottom = () => {
	const elementRef = useRef();
	useEffect(() => elementRef.current.scrollIntoView());
	return <div ref={elementRef} />;
  };

  const [messages, setMessages] = useState([{user:{}}]);
  const { user } = useUserState();
  const [user_id, setUser_id] = useState(useUserState().user.id);
	const [messageBody, setMessageBody] = useState('');
	const contact = messages.user ? `${user.username}` : 'user';
 
	   useEffect(() => {
	   fetchMessages();
	 }, []);
	 const fetchMessages = () => {
	   axios
		 .get(`${baseUrl}/rooms/1/tweets`)
		 .then((res) => {
		   console.log(res);
		   setMessages(res.data);
		 })
		 .catch((err) => {
		   console.log(err);
		 });
	 };

  return (
	<Flex w="100%" h="80%" overflowY="scroll" flexDirection="column" p="3">
  	{messages.map((message, index) => {
    	if (message.user.username === user.username) {
      	return (
        	<Flex key={index} w="100%" justify="flex-end">
          	<Flex
            	bg="black"
            	color="white"
            	minW="100px"
            	maxW="350px"
            	my="1"
            	p="3"
          	>
            	<Tooltip label={message.user.username} bg='red.600'>
            	<Text>{message.body}</Text>
				</Tooltip>
          	</Flex>
        	</Flex>
      	);
    	} else {
      	return (
        	<Flex key={index} w="100%">
          	<Avatar
            	name={contact}
            	bg="blue.300"
          	></Avatar>
          	<Flex
            	bg="gray.100"
            	color="black"
            	minW="100px"
            	maxW="350px"
            	my="1"
            	p="3"
          	>
				  <Tooltip label={message.user.username} bg='red.600'>
            	<Text>{message.body}</Text>
				</Tooltip>
          	</Flex>
        	</Flex>
      	);
    	}
  	})}
  	<AlwaysScrollToBottom />
	</Flex>
  );
};

export default Messages;