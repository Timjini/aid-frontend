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
import '../styles/Home.css';


const baseUrl = 'http://localhost:3001/api/v1' || "https://hidden-eyrie-18402.herokuapp.com/api/v1";


 
function Messages() {

     const { id } = useParams();
     const [messages, setMessages] = useState([{user:{}}]);
     const { user } = useUserState();
     const [position, setPosition] = useState('top-right');
     const [user_id, setUser_id] = useState(useUserState().user.id);
      const [messageBody, setMessageBody] = useState('');
    
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

              {messages.map((message) => {
                                if (message.user.username === user.username)
                                {
                                  return(
                                    <div className="media media-chat">
                                    <div className="media-body">
                                      <p>{message.body}</p>
                                      <p className="meta"><time dateTime="2018">{message.user.username}</time></p>
                                    </div>
                                  </div>
                                  )
 
                                } else {
                                  return (
                                    <div className="media media-chat media-chat-reverse">
                                    <div className="media-body">
                                      <p>{message.body}</p>
                                      <p className="meta"><time dateTime="2018">{message.user.username}</time></p>
                                    </div>
                                  </div>
                                  )
                               
                                }                  
                               })}
                               </>
                                )
}


export default Messages;


