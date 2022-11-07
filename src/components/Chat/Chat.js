import { Flex } from "@chakra-ui/react";
import React, { useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import Messages from "./Messages";
import axios from "axios";
import { API_TWEETS } from "../../constant";


function Chat () {
  const [messages, setMessages] = useState([]);
  const [body, setBody] = useState("");

  const postBody = async (e) => {
    if (!body.trim()) {
      alert("address or description is invalid");
      return;
    }
    try {
      const response = await axios.post(`${API_TWEETS}`, {
        body,
      });
      if (response.status === 201) {
        alert(` You have created: ${JSON.stringify(response.body)}`);
        setBody('');
      } else {
        throw new Error("An error has occurred");
      }
      setBody([body,...response])
    } catch (error) {
      alert("An error has occurred");
    }
  };

  return (
	<Flex w="100%" h="100vh" justify="center" align="center">
  	<Flex w="40%" h="90%" flexDir="column">
    	<Header />
    	<Messages messages={messages} />
    	<Footer
      	inputMessage={messages}
      	setInputMessage={setMessages}
      	handleSendMessage={postBody}
    	/>
  	</Flex>
	</Flex>
  );
};

export default Chat;