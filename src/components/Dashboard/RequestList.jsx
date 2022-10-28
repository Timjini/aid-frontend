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


const baseUrl = `http://localhost:3001`;


export default function RequestList() {
    const [data, setData] = useState ([])




  useEffect (() => {
    axios.get(`${baseUrl}/api/v1/requests`)
    .then (res => {
      setData(res.data)
      console.log(res.data)
    })
  }, [])


  return (
    
    <Center py={6}>
      {data.map((data, index) => (
        
         
        <Box
        key={data.id}
        maxW={'320px'}
        w={'full'}
        boxShadow={'2xl'}
        rounded={'lg'}
        p={10}
        textAlign={'center'}>

        <Heading fontSize={'2xl'} fontFamily={'body'}>
          {data.user.first_name} {data.user.last_name}
        </Heading>
        <Text fontWeight={600} color={'gray.500'} mb={4}>
          @{data.user.username}
        </Text>
        <Text
          textAlign={'center'}
          px={3}>
          {data.description}
        </Text>

        <Stack align={'center'} justify={'center'} direction={'row'} mt={6}>
          <Badge
            px={2}
            py={1}
            fontWeight={'400'}>
            #{data.kind}
          </Badge>
          <Badge
            px={2}
            py={1}
            fontWeight={'400'}>
            #{data.situation}
          </Badge>
          <Badge
            px={2}
            py={1}
            fontWeight={'400'}>
            #{data.address}
          </Badge>
        </Stack>

        <Stack mt={8} direction={'row'} spacing={4}>
          <Button
            flex={1}
            fontSize={'sm'}
            rounded={'full'}
            bg={'blue.400'}
            color={'white'}
            boxShadow={
              '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
            }
            _hover={{
              bg: 'blue.500',
            }}
            _focus={{
              bg: 'blue.500',
            }}>
            Help
          </Button>
        </Stack>

        </Box>
         
      ))}
    </Center>
      

  )
};