import React,{ useEffect,useState }  from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import useAxios from '../../apis/useAxios';
import {
        ToastContainer,
        Toast,
        Container
} from 'react-bootstrap';
import { useUserState } from '../../contexts/user';
import '../styles/Home.css';

//const baseUrl = 'http://localhost:3001/api/v1';
const baseURL = "https://hidden-eyrie-18402.herokuapp.com/api/v1"


 
function Messages() {
    const [position, setPosition] = useState('top-start');
     const { id } = useParams();
     const {data , loading} = useAxios(`${baseUrl}/rooms/`+id);
     const { user } = useUserState();

        return (
            
            <div>
            {loading && <div>Loading...</div>}
              {data.map (data => (
                  <>
                  <Container key={data.user_id}>
                    <div
                    aria-live="polite"
                    aria-atomic="true"
                    className="bg-dark position-relative"
                    style={{ minHeight: '150px' }}
                    >
                    <ToastContainer className="p-3 box" position={position} >
                    <Toast>
                        <Toast.Header closeButton={false}>
                        <strong className="me-auto">{data.user_id}</strong>
                        <small>{data.updated_at}</small>
                        </Toast.Header>
                        <Toast.Body>{data.body}</Toast.Body>
                    </Toast>
                    </ToastContainer>
                    </div>
                    </Container>
                    </>
              ))}
            </div>
        )

}

export default Messages;