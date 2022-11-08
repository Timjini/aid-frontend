import React,{useEffect, useState} from 'react';
import {
  Select,
  FormControl,
  FormLabel,
  Input,
  Button,
  Stat,
  StatLabel,
  StatNumber,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Tooltip,
  Textarea
  
} from '@chakra-ui/react';
import { setAuthHeaders } from '../../apis/axios';
import axios from 'axios';
import RequestList from './RequestList.tsx';
import {API_REQUESTS} from '../../constant/index'




function CreateRequest(){
    const [requests, setRequests] = useState([]);
    const [description, setDescription] = useState ('');
    const [address, setAddress] = useState ('');
    const [situation, setSituation] = useState('pending');
    const [kind, setKind] = useState('onetime');
    const { isOpen, onOpen, onClose } = useDisclosure()
    const firstField = React.useRef()

  let data = requests.length
  let pending = requests.fulfillments?.length

    useEffect(() => {
        fetchRequests();
      }, []);
    const fetchRequests = () => {
        axios
          .get(`${API_REQUESTS}`)
          .then((res) => {
            console.log(res);
            setRequests(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      };

    const handleSubmit = async (e) => {
        //e.preventDefault();
        const newRequest = {description, address, kind,situation}
        try{
            const response = await axios.post(`${API_REQUESTS}`, newRequest);
            setAuthHeaders();
            const allRequests = [...requests, response.data];
            setRequests(allRequests);
            setDescription('');
            setAddress('');
            setKind('');
            setSituation('');
        } catch (err) {
            console.log(`Error: ${err.message}`);
        }
    }
    
      const changeKind = (kind) =>{
    setKind(kind)
  }

    return (
        <>
        <div className="container pt-2">
        <Stat>
          <StatLabel>Total Requests</StatLabel>
          <StatNumber>{data}</StatNumber>
          <StatNumber>{pending}</StatNumber>
        </Stat>
        </div>
        <Tooltip hasArrow label='Click to Add' bg='gray.300' color='black'>
            <Button colorScheme='teal' onClick={onOpen}>
            + Create a Request
            </Button>
        </Tooltip>
       
      <Drawer
        isOpen={isOpen}
        placement='right'
        initialFocusRef={firstField}
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth='1px'>
            Create a new account
          </DrawerHeader>

          <DrawerBody>
          <form onSubmit={handleSubmit}> 
        <FormControl>
            <FormLabel>Address</FormLabel>
            <Input type="text" value={address} onChange={(e) => setAddress(e.target.value)}/>
        </FormControl>
        <FormControl>
            <FormLabel>Description</FormLabel>
            <Textarea type="text" value={description} onChange={(e) => setDescription(e.target.value)}/>
        </FormControl>
                    <FormControl>
                    <FormLabel>Request Type</FormLabel>
                        <Select placeholder='Type of Request' value={kind} onChange={(e) => changeKind(e.target.value)}>
                            <option value = "onetime">One Time</option>
                            <option value= "financial">Financial Request</option>
                        </Select>
                    </FormControl>
                <Button
                   mt={4}
                    color='teal'
                     type='submit'
                            >
                    Submit
          </Button>
                </form>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

        <RequestList />
        
        </>
    )

}

export default CreateRequest;