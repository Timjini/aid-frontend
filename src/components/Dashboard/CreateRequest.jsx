import React,{useEffect, useState} from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Tooltip,
  Textarea,
  RadioGroup,
  Stack,
  Radio,
} from '@chakra-ui/react';
import axios from 'axios';
import {API_REQUESTS} from '../../constant/index';
import { setAuthHeaders } from '../../apis/axios';
import Select from 'react-select';




function CreateRequest(){
    const [requests, setRequests] = useState('');
    const [description, setDescription] = useState ('');
    const [address, setAddress] = useState ('');
    const [situation, setSituation] = useState('pending');
    // select kind of request onetime or financial 
    const [kind, setKind] = useState('onetime');
    const [selectedOption, setSelectedOption] = useState(null);
    const [options, setOptions] = useState([]);

    //Drwaer
    const { isOpen, onOpen, onClose } = useDisclosure()
    const firstField = React.useRef()


    useEffect(() => {
        fetchRequests();
      }, []);


      

      const fetchRequests = async () => {
        try {
          const response = await axios.get(API_REQUESTS);
          setAuthHeaders();
          setRequests(response.data);
        } catch (error) {
          console.log(error);
          error();
        }
      };
    // post request with roken and headers 
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post(API_REQUESTS, {
            description,
            address,
            situation,
            kind,
          });
          setAuthHeaders();
          setRequests(response.data);
          onClose();
          window.location.reload();
        } catch (error) {
          console.log(error);
          error();
        }
      };

    return (
        <>
      <div className="container p-2">
        <Tooltip hasArrow label='Click to Add' bg='gray.300' color='black'>
            <Button colorScheme='teal' onClick={onOpen}>
            + Create a Request
            </Button>
        </Tooltip>
      </div> 
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
                    <RadioGroup onChange={setKind} value={kind}>
                      <Stack direction='row'>
                        <Radio value='onetime'>One Time Help </Radio>
                        <Radio value='financial'>Financial Help</Radio>
                      </Stack>
                    </RadioGroup>
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
        </>
    )

}

export default CreateRequest;