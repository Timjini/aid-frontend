import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Link as ChakraLink,
    Button,
    Heading,
    useColorModeValue,
    HStack,
    FormErrorMessage,
    useToast
  } from '@chakra-ui/react';
import authenticationApi from '../../apis/authentication';
import { useAuthDispatch } from '../../contexts/auth';
import { useUserDispatch } from '../../contexts/user';




function Register() {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const authDispatch = useAuthDispatch();
  const userDispatch = useUserDispatch();
  const [avatar, setAvatar] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
        const response = await authenticationApi.signup({
            user : {
            email,
            firstName,
            lastName,
            password,
            passwordConfirmation,
            avatar
            }
        });
        if (response.data.success) {
            const {token, user} = response.data;
            localStorage.setItem('token', token);
            authDispatch({
                type: 'LOGIN',
                payload: token
            });
            userDispatch({
                type: 'SET_USER',
                payload: user
            });
            toast({
                title: 'Success',
                description: 'You have successfully registered',
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
            setLoading(false);
        }
    } catch (error) {
        toast({
            title: 'Error',
            description: error.response.data.message,
            status: 'error',
            duration: 5000,
            isClosable: true,
        });
        setLoading(false);
    }
    };

    

  return (
    <form onSubmit={handleRegister}>
        <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input type="email" value={email} onChange={(e)=> setEmail(e.target.value)} />
        </FormControl>
        <FormControl isRequired>
            <FormLabel>First Name</FormLabel>
            <Input type="text" value={firstName} onChange={(e)=> setFirstName(e.target.value)} />
        </FormControl>
        <FormControl isRequired>
            <FormLabel>Last Name</FormLabel>
            <Input type="text" value={lastName} onChange={(e)=> setLastName(e.target.value)} />
        </FormControl>
        <FormControl isRequired>
            <FormLabel>Password</FormLabel>
            <Input type="password" value={password} onChange={(e)=> setPassword(e.target.value)} />
        </FormControl>
        <FormControl isRequired>
            <FormLabel>Confirm Password</FormLabel>
            <Input type="password" value={passwordConfirmation} onChange={(e)=> setPasswordConfirmation(e.target.value)} />
        </FormControl>
        <FormControl isRequired>
            <FormLabel>Avatar</FormLabel>
            <Input type="file" onChange={(e)=> setAvatar(e.target.files[0])} />
        </FormControl>
        <Button type="submit" colorScheme="teal">Register</Button>
        
    </form>
  )
}

export default Register