import React from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import Messages from './Messages';
import axios from 'axios'
import Form from 'react-bootstrap/Form';
import { useEffect, useState} from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { useUserState } from '../../contexts/user';



const baseUrl = 'http://localhost:3001/';
//const baseUrl = 'https://hidden-eyrie-18402.herokuapp.com/';
 
function Rooms() {
    
    const [body, setBody] = useState ([]);
    const { user } = useUserState();
    const { id } = useParams();


  const postBody = async (e) => {
    if (!body.trim()) {
      alert("address or description is invalid");
      return;
    }
    try {
      const response = await axios.post(`${baseUrl}api/v1/rooms/2/tweets`, {
        body,
      });
      if (response.status === 201) {
        alert(` You have created: ${JSON.stringify(response.body)}`);
        setBody('');
      } else {
        throw new Error("An error has occurred");
      }
      setBody([body,...response])
    } catch (error) {
      alert("An error has occurred");
    }
  };


  return (
    <div className="page-content page-container" id="page-content">
                <div className="padding">
                    <div className="row container d-flex justify-content-center">
                        <div className="col-md-6">
                                    <div className="card card-bordered">
                                        <div className="card-header">
                                        <h4 className="card-title"><strong>Chat</strong></h4>
                                        </div>
    <Messages />
    <div className="ps-scrollbar-x-rail"><div className="ps-scrollbar-x" tabindex="0"></div></div>
                                  <div className="ps-scrollbar-y-rail">
                                    <div className="ps-scrollbar-y" tabindex="0" ></div></div></div>

                                  <div className="publisher bt-1 border-light">
                                    <img className="avatar avatar-xs" src="https://img.icons8.com/color/36/000000/administrator-male.png" alt="..." />
                                    <input className="publisher-input" type="text" placeholder="message ..."
                                      value={body}
                                      onChange={(e) => setBody(e.target.value)} />
                                    <span className="publisher-btn file-group">
                                      <button type="submit" onClick={postBody}>Send</button>
                                    </span>
                                  </div>

                                </div>
                              </div>
                            </div>
                        </div>
  )

}

export default Rooms

