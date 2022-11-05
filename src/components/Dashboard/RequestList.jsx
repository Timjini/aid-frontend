import React from 'react';
import axios from 'axios';
import { useEffect, useState} from 'react';
import {
  Heading,
  Box,
  Center,
  Text,
  Stack,
  Button,
  Badge,
} from '@chakra-ui/react';
import '../styles/Home.css';
import { Link } from 'react-router-dom';

const baseUrl = `http://localhost:3001`;


export default function RequestList() {
    const [requests, setRequets] = useState ([])




  useEffect (() => {
    axios.get(`${baseUrl}/api/v1/requests`)
    .then (res => {
      setRequets(res.data)
      console.log(res.data)
    })
  }, [])


  return (
    <Center py={6}>

      {requests.map((request, index) => (
        
         
        <Box
        key={request}
        maxW={'320px'}
        w={'full'}
        boxShadow={'2xl'}
        rounded={'lg'}
        p={10}
        textAlign={'center'}>

        <Heading fontSize={'2xl'} fontFamily={'body'}>
          {request.user.first_name} {request.user.last_name}
        </Heading>
        <Text fontWeight={600} color={'gray.500'} mb={4}>
          @{request.user.username}
        </Text>
        <Text
          textAlign={'center'}
          px={3}>
          {request.description}
        </Text>

        <Stack align={'center'} justify={'center'} direction={'row'} mt={6}>
          <Badge
            px={2}
            py={1}
            fontWeight={'400'}>
            #{request.kind}
          </Badge>
          <Badge
            px={2}
            py={1}
            fontWeight={'400'}>
            #{request.situation}
          </Badge>
          <Badge
            px={2}
            py={1}
            fontWeight={'400'}>
            #{request.address}
          </Badge>
        </Stack>

        <Stack mt={8} direction={'row'} spacing={4}>
              <Link to={`/request/${request.id}`}
              className="btn btn-primary"
              >
              Help
              </Link>
        </Stack>

        </Box>
         
      ))}
    </Center>
      

  )
};