import React, {useEffect, useState} from "react";
import { Flex, Input, Button } from "@chakra-ui/react";
import axios from "axios";
import {useUserState} from '../../contexts/user';
import { setAuthHeaders } from "../../apis/axios";

const baseUrl = 'http://localhost:3001/';

const Footer = ({ inputMessage, setInputMessage, handleSendMessage }) => {

	const [body, setBody] = useState ([]);
	const [tweets, setTweets] = useState ([]);
    const { user } = useUserState();


	useEffect(() => {
        fetchtweets();
    }, []);
    const fetchtweets = () => {
      axios
        .get(
			`${baseUrl}api/v1/rooms/2/tweets`
        )
        .then((res) => {
			setTweets(res.data);
          console.log(res.data);
        })
        .catch((err) => console.log(err));
    };
    
	
	
		const postBody = async (e) => {
			e.preventDefault();
			
		if (!body.trim()) {
		alert("We are having trouble with your message");
		return;
		}
		try {
		const response = await axios.post(`${baseUrl}api/v1/rooms/2/tweets`, {
			body,
		});
		if (response.status === 200) {
			setTweets('');
			fetchtweets();
			window.location.reload();
		} else {
			throw new Error("An error has occurred");
		}
		setTweets([tweets,...response])
		} catch (error) {
		console.log(error);
		}
	};



  return (
	<Flex w="100%" mt="5">
  	<Input
    	placeholder="Type Something..."
    	border="none"
    	borderRadius="none"
    	_focus={{
      	border: "1px solid black",
    	}}
    	onKeyPress={(e) => {
      	if (e.key === "Enter") {
        	postBody();
      	}
    	}}
    	value={body}
    	onChange={(e) => setBody(e.target.value)}
  	/>
  	<Button
    	bg="black"
    	color="white"
    	borderRadius="none"
    	_hover={{
      	bg: "white",
      	color: "black",
      	border: "1px solid black",
    	}}
    	onClick={postBody}
  	>
    	Send
  	</Button>
	</Flex>
  );
};

export default Footer;