import React from 'react';
import axios from 'axios';
import { useEffect, useState} from 'react';
import {
    Heading,
    Avatar,
    Box,
    Center,
    Text,
    Stack,
    Button,
    Link,
    Badge,
    useColorModeValue,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    FormControl,
    useDisclosure,
    Select,
    FormLabel,
    Input,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Textarea,
  } from '@chakra-ui/react';
  import '../styles/Home.css';


const baseUrl = `http://localhost:3001`;


export default function RequestPost() {
    const [data, setData] = useState ([])
  const [description, setDescription] = useState ('')
  const [address, setAddress] = useState ('')
  const [situation, setSituation] = useState()
  const [kind, setKind] = useState('onetime')
  const [isLoading, setIsLoading] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure()

  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)


  useEffect (() => {
    axios.get(`${baseUrl}/api/v1/requests`)
    .then (res => {
      setData(res.data)
      console.log(res.data)
    })
  }, [])

  const postData = async (e) => {
    if (!address.trim() || !description.trim()) {
      alert("address or description is invalid");
      return;
    }
    setIsLoading(false);
    try {
      //e.preventDefault();
      const response = await axios.post(`${baseUrl}/api/v1/requests`, {
        address,
        description,
        kind,
        situation
      });
      if (response.status === 201) {
        alert(` You have created: ${JSON.stringify(response.data)}`);
        setIsLoading(false);
        setAddress('');
        setDescription('');
        setSituation();
        setKind({})
      } else {
        throw new Error("An error has occurred");
      }
      setData([data,...response])
    } catch (error) {
      
    }
  };

  const changeKind = (kind) =>{
    setKind(kind)
  }
  const deleteData = async (id, e) => {
    let data = await axios.delete(`${baseUrl}/api/v1/requests/${id}`)
    setData();
  }

  const changeSituation = (situation) => {  
    setSituation(situation)
  }

const requests = data.length;

const arr = data.map((data, index) => {
    return (
        <Center py={6}>
        <Box
          maxW={'320px'}
          w={'full'}
          bg={('white', 'gray.900')}
          boxShadow={'2xl'}
          rounded={'lg'}
          p={6}
          textAlign={'center'}>
          <Avatar
            size={'xl'}
            src={
              'https://images.unsplash.com/photo-1520810627419-35e362c5dc07?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ'
            }
            alt={'Avatar Alt'}
            mb={4}
            pos={'relative'}
            _after={{
              content: '""',
              w: 4,
              h: 4,
              bg: 'green.300',
              border: '2px solid white',
              rounded: 'full',
              pos: 'absolute',
              bottom: 0,
              right: 3,
            }}
          />
          <Heading fontSize={'2xl'} fontFamily={'body'} color='white'>
          {data.id}
          </Heading>
          <Text fontWeight={600} color={'gray.500'} mb={4}>
          {data.kind}
          </Text>
          <Text
            textAlign={'center'}
            color={('gray.700', 'gray.400')}
            px={3}>
            {data.description}{' '}
            <Link href={'#'} color={'blue.400'}>
              #tag
            </Link>{' '}
            me in your posts
          </Text>
  
          <Stack align={'center'} justify={'center'} direction={'row'} mt={6}>
            <Badge
              px={2}
              py={1}
              color='white'
              bg={('white.10', 'white.800')}
              fontWeight={'400'}>
              {data.address}
            </Badge>
            {/* <Badge
              px={2}
              py={1}
              bg={useColorModeValue('gray.50', 'gray.800')}
              fontWeight={'400'}>
              #photography
            </Badge>
            <Badge
              px={2}
              py={1}
              bg={useColorModeValue('gray.50', 'gray.800')}
              fontWeight={'400'}>
              #music
            </Badge> */}
          </Stack>
  
          <Stack mt={8} direction={'row'} spacing={4}>
            <Button
              flex={1}
              fontSize={'sm'}
              rounded={'full'}
              _focus={{
                bg: 'gray.200',
              }}>
              Message
            </Button>
            <Button
              type="submit" 
              onClick={() => deleteData(data.id)}
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
              Delete
            </Button>
          </Stack>
        </Box>
      </Center>

    )
  })

  return (
    <>
    <Button  colorScheme='teal' onClick={onOpen}>
        Create Request
      </Button>
      <Drawer
        isOpen={isOpen}
        placement='right'
        //initialFocusRef={firstField}
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth='1px'>
            Create a new account
          </DrawerHeader>

          <DrawerBody>
            <Stack spacing='24px'>
              <Box>
                <FormLabel htmlFor='address'>Adress</FormLabel>
                <Input
                   type="text" 
                   placeholder="address"
                   value={address}
                   onChange={(e) => setAddress(e.target.value)}
                />
              </Box>

              <Box>
                <FormLabel htmlFor=''>Select Type</FormLabel>
                <Select 
                value={kind}
                onChange={(event) => changeKind(event.target.value)}>
                  <option type="text" value="onetime">One time</option>
                  <option type="text" value="financial">financial</option>
                </Select>
              </Box>

              <Box>
                <FormLabel htmlFor=''>Description</FormLabel>
                <Input
                    type="text" 
                   placeholder="description"
                   value={description}
                   onChange={(e) => setDescription(e.target.value)}
                />
              </Box>
            </Stack>
          </DrawerBody>

          <DrawerFooter borderTopWidth='1px'>
            <Button variant='outline' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme='blue' type="submit" onClick={postData}>Submit</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
   
    <div class="cardscontainer">
    {arr}
    </div>
  </>
  )
};