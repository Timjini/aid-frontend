// import React from 'react';
// import axios from 'axios';
// import Card from 'react-bootstrap/Card';
// import Button from 'react-bootstrap/Button';
// import { Container } from 'react-bootstrap';
// import Form from 'react-bootstrap/Form';
// import { useEffect, useState} from 'react';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
// import '../styles/Home.css';
// //import { useUserState } from '../../contexts/user';
// import {Link} from 'react-router-dom'
// import { useUserState } from '../../contexts/user';
// import RequestList from './RequestList';
// import { Box, Heading, Text } from '@chakra-ui/react';
// import { InfoIcon , AddIcon, leftIcon } from '@chakra-ui/icons';
// import '../styles/Home.css'
// import {
//   Drawer,
//   DrawerBody,
//   DrawerFooter,
//   DrawerHeader,
//   DrawerOverlay,
//   DrawerContent,
//   DrawerCloseButton,
//   FormLabel,
//   Stack,
//   Input,
//   Select,
//   Wrap, 
//   WrapItem,
//   Textarea,
//   useToast,
//   useDisclosure,
//   withDefaultColorScheme
// } from '@chakra-ui/react'




// // const baseUrl = `http://localhost:3001`||`https://hidden-eyrie-18402.herokuapp.com`;
// const baseUrl = `http://localhost:3001`;


// export default function PostRequest () {
//   const { user } = useUserState();

//   const [data, setData] = useState ([]);
//   //const [requests, setRequests] = useState([]);
//   const [description, setDescription] = useState ('');
//   const [address, setAddress] = useState ('');
//   const [situation, setSituation] = useState('pending');
//   const [kind, setKind] = useState('onetime');
//   const [isLoading, setIsLoading] = useState(false);



// //ChakraDrawer 
//   const { isOpen, onOpen, onClose } = useDisclosure()
//   const firstField = React.useRef()
// // End


//   useEffect (() => {
//     axios.get(`${baseUrl}/api/v1/requests`)
//     .then (res => {
//       setData(res.data)
//       console.log(res.data)
//     })
//   }, [])

//   // const postData = async (e) => {
//   //   e.preventDefault();
//   //   if (!address.trim() || !description.trim()) {
//   //     alert("address or description is invalid");
//   //     return;
//   //   }
//   //   setIsLoading(false);
//   //   try {
//   //     //
//   //     const response = await axios.post(`${baseUrl}/api/v1/requests`, {
//   //       address,
//   //       description,
//   //       kind,
//   //       situation
//   //     });
//   //     if (response.status === 201) {
//   //       alert(` You have created: ${JSON.stringify(response.data)}`);
//   //       setIsLoading(false);
//   //       setAddress('');
//   //       setDescription('');
//   //       setSituation();
//   //       setKind({})
//   //     } else {
//   //       throw new Error("An error has occurred");
//   //     }
//   //     setData([data,...response])
//   //   } catch (error) {
//   //     alert("An error has occurred");
//   //     setIsLoading(false);
//   //   }
//   // };

//   const postData = async (e) => {
//     e.stopPropagation();
//     e.nativeEvent.stopImmediatePropagation();
//     axios
//       .post(`${baseUrl}/api/v1/requests`, {
//         address,
//         description,
//         kind,
//         situation,
//       })
//       .then((response) => {
//         setData([...data,response.data]);
//       });
//   }

//   const changeKind = (kind) =>{
//     setKind(kind)
//   }
//   const deleteData = async (id, e) => {
//     //e.preventDefault();
//     let data = await axios.delete(`${baseUrl}/api/v1/requests/${id}`)
//     setData(); 
//   }

//   const updateData = async (id, e) =>{
//     let data = await axios.put(`${baseUrl}/api/v1/requests/${id}`)
//     setData(); 

//   }

//   const changeSituation = (situation) => {
//     setSituation(situation)
//   }
//   // data.sort((a, b) => {
//   //   return new Date(b.created_at) - new Date(a.created_at); // descending
//   // })

//   const toast = useToast()


//   const requests = data.length;

//     return (

//         <>
//           <Box textAlign="center" py={10} px={6}>
//                 <InfoIcon boxSize={'50px'} color={'blue.500'} />
//                 <Heading as="h2" size="xl" mt={6} mb={2}>
//                 Number of requests {requests}
//                 </Heading>
//                 <Text color={'gray.500'}>
//                   Welcome <span>{user.first_name} {user.last_name}</span> you can make a difference Today!
//                 </Text>
//               </Box>      

                  
//             <Button leftIcon={<AddIcon />} color='green' onClick={onOpen}>
//             Create a request
//             </Button>
//               <Drawer
//                 isOpen={isOpen}
//                 placement='right'
//                 initialFocusRef={firstField}
//                 onClose={onClose}
//               >
//                 <DrawerOverlay />
//                 <DrawerContent>
//                   <DrawerCloseButton />
//                   <DrawerHeader borderBottomWidth='1px'>
//                     Create a request
//                   </DrawerHeader>

//                   <DrawerBody>
//                     <Stack spacing='24px'>
//                       <Box>
//                         <FormLabel
//                           htmlFor='address'>Address</FormLabel>
//                         <Input
//                           ref={firstField}
//                           placeholder="address"
//                           value={address}
//                           onChange={(e) => setAddress(e.target.value)}
//                         />
//                       </Box>
//                       <Box>
//                         <FormLabel htmlFor='owner'>Select Type</FormLabel>
//                         <Select id='owner' defaultValue='segun' 
//                         value={kind}
//                         onChange={(event) => changeKind(event.target.value)}
//                         >
//                           <option 
//                             type="text" 
//                             value = "onetime">One Time</option>
//                           <option
//                             type="text" 
//                             value= "financial"
//                             >Financial Request</option>
//                         </Select>
//                       </Box>

//                       <Box>
//                         <FormLabel htmlFor='desc'>Description</FormLabel>
//                         <Textarea 
//                             id='desc'           
//                             placeholder="description"
//                             value={description}
//                             onChange={(e) => setDescription(e.target.value)}
//                             />
//                       </Box>
//                     </Stack>
//                   </DrawerBody>

//                   <DrawerFooter borderTopWidth='1px'>
//                     <Button variant='outline' mr={3} onClick={onClose}>
//                       Cancel
//                     </Button>
//                     <Button color='blue'  
//                         onClick={postData}>
//                           Submit
//                     </Button>
//                   </DrawerFooter>
//                 </DrawerContent>
//               </Drawer>
            
//             <RequestList />
//         </>
//     )

    
// }