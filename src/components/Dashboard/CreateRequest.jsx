import React,{useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {
  Select,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  Button
} from '@chakra-ui/react';
import { InfoIcon , AddIcon, leftIcon } from '@chakra-ui/icons';
import { useUserState } from '../../contexts/user';
import {Formik} from 'formik';
//import {setAuthHeaders} from '../../apis/authentication';
import authenticationApi from '../../apis/authentication';
import { setAuthHeaders } from '../../apis/axios';
import axios from 'axios';
import Card from 'react-bootstrap/Card';

const baseUrl = 'http://localhost:3000'


function CreateRequest(){

    const { user } = useUserState();

    const [requests, setRequests] = useState([]);
    const [description, setDescription] = useState ('');
    const [address, setAddress] = useState ('');
    const [situation, setSituation] = useState('pending');
    const [kind, setKind] = useState('onetime');
    const history = useHistory();

    //ChakraDrawer 
  const { isOpen, onOpen, onClose } = useDisclosure()
  const firstField = React.useRef()
// End

    useEffect(() => {
        const fetchRequests = async() => {
            try{
                const response = await authenticationApi.getrequest();
                setRequests(response.data);
                console.log(response);

            }catch (err) {
                if(err.response){
                    console.log(err.response.data.message)
                }else {
                    console.log(`Error : ${err.message}`)
                }
            }
        }
        fetchRequests();
    },[])

    const handleSubmit = async (e) => {
        //e.preventDefault();
        const newRequest = {description, address, kind,situation}
        try{
            const response = await axios.post(`${baseUrl}/api/v1/requests`, newRequest);
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


    // const postData = async (e) => {
    //     e.preventDefault();
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
    //       setData();
    //   }
    
      const changeKind = (kind) =>{
    setKind(kind)
  }

    return (
        <>

        <div className="p-5">
        <form onSubmit={handleSubmit}> 
        <FormControl>
            <FormLabel>Address</FormLabel>
            <Input type="text" value={address} onChange={(e) => setAddress(e.target.value)}/>
        </FormControl>
        <FormControl>
            <FormLabel>Description</FormLabel>
            <Input type="text" value={description} onChange={(e) => setDescription(e.target.value)}/>
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
        </div>
           
                {requests.map((request, index) => (
                    <div className='p-2'>
                    <Card key={request.id}>
                            <Card.Header>{request.user.username}</Card.Header>
                            <Card.Body>
                            <Card.Title>{request.address}</Card.Title>
                            <Card.Text>
                               {request.description}<br/>
                               {request.kind}
                            </Card.Text>
                            <Button  color='teal' mt={4} >Help</Button>
                            </Card.Body>
                    </Card>
                    </div>

        ))}
        
        </>
    )

}

export default CreateRequest;