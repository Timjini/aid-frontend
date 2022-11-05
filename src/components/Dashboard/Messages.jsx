import React,{ useEffect,useState }  from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import {
        ToastContainer,
        Toast,
        Container
} from 'react-bootstrap';
import '../styles/Home.css';
import axios from 'axios';
import {useUserState} from '../../contexts/user';
import { Avatar } from '@chakra-ui/react';

const baseUrl = 'http://localhost:3001/api/v1' || "https://hidden-eyrie-18402.herokuapp.com/api/v1";


 
function Messages() {

     const { id } = useParams();
     const [message, setMessages] = useState([{user:{}}]);
     const { user } = useUserState();
     const contact = user ? `${user.first_name} ${user.last_name}` : 'user';
     const [position, setPosition] = useState('top-right');

    
    
          useEffect(() => {
          fetchMessages();
        }, []);
        const fetchMessages = () => {
          axios
            .get(`${baseUrl}/rooms/1/tweets`)
            .then((res) => {
              console.log(res);
              setMessages(res.data);
            })
            .catch((err) => {
              console.log(err);
            });
        };
  
    return (
            <>
              {message.map((message) => (
                  <Container key={message.user_id}>
                    <div
                    aria-live="polite"
                    aria-atomic="true"
                    className="bg-dark position-relative"
                    style={{ minHeight: '150px' }}
                    >
                    <ToastContainer className="p-3 box" position={message.user_id === user.id ? setPosition : 'bottom-center' }>
                    <Toast>
                        <Toast.Header closeButton={false}>
                        <Avatar size={'sm'} name={contact} />
                        <strong className="me-auto">{message.user?.username}</strong>
                        <small>{message.updated_at}</small>
                        </Toast.Header>
                        <Toast.Body>{message.body}</Toast.Body>
                    </Toast>
                    </ToastContainer>
                    </div>
                    </Container>
                    ))}

              </>
        )
}


export default Messages;


