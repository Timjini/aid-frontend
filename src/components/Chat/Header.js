import React from "react";
import { Flex, Avatar, AvatarBadge, Text } from "@chakra-ui/react";
import {useUserState}	from '../../contexts/user';

function Header () {

	const { user } = useUserState();
	const contact = user ? `${user.first_name} ${user.last_name}` : 'user';


  return (
	<Flex w="100%">
  	<Avatar size="lg" name={contact} >
    	<AvatarBadge boxSize="1.25em" bg="green.500" />
  	</Avatar>
  	<Flex flexDirection="column" mx="5" justify="center">
    	<Text fontSize="lg" fontWeight="bold">
      	{user.username}
    	</Text>
    	<Text color="green.500">Online</Text>
  	</Flex>
	</Flex>
  );
};

export default Header;