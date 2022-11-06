import React,{ useEffect, useState} from 'react';
import axios from "axios";
import { setAuthHeaders } from '../../apis/axios';
import {useUserState} from '../../contexts/user'
import authenticationApi from '../../apis/authentication';
import { useAuthDispatch } from '../../contexts/auth';
import { useUserDispatch } from '../../contexts/user';
import {
  useToast,
} from '@chakra-ui/react';
import Requests from './Requests';
import { API_REQUESTS } from '../../constant';
import { API_FULFILLMENTS } from '../../constant';

const baseUrl = 'http://localhost:3001/api/v1/rooms'

function RequestDetail({match}) {
  const [request, setRequests] = useState({ user: {} });
  const [text, setText] = useState([]);
  const [data, setData] = useState({user: {}});
  const [request_id, setRequest_id] = useState(match.params.id);
  const [rooms, setRooms] = useState([]);
  const [name, setName] = useState([]);

  

  useEffect(() => {
    fetchRequest();
}, []);
const fetchRequest = () => {
  axios
    .get(
      `${API_REQUESTS}/${match.params.id}`
    )
    .then((res) => {
      setRequests(res.data);
      console.log(res.data);
    })
    .catch((err) => console.log(err));
};

useEffect(() => {
    fetchData();
}, []);
const fetchData = () => {
  axios
    .get(
      `${API_FULFILLMENTS}`
    )
    .then((res) => {
      setData(res.data);
      console.log(res.data);
    })
    .catch((err) => console.log(err));
};

const postData = async (e) => {
axios
  .post(`${API_FULFILLMENTS}`, {
    text,
    request_id
  })
  .then((response) => {
    setData([...data,response.data]);
  });
}

const createRoom = async (e) => {
  axios.post(`${baseUrl}`, {
    request_id,
    name,
  }).then((response) => {
    setRooms([...rooms, response.data]);
  });
}


  return (
    <>
      <div className="container p-5" key={request.id}>
        <div className="row">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h3 className="card-title">REQUEST</h3>
                <p className="card-text"><span style={{fontWeight:"600"}}> Description :</span>{request.description}</p>
                <p className="card-text"><span style={{fontWeight:"600"}}> Address :</span>{request.address}</p>
                <p className="card-text"><span style={{fontWeight:"600"}}> Kind :</span> {request.kind}</p>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{request.user?.username}</h5>
                <p className="card-text">{request.user?.email}</p>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Fulfillments</h5>
                <p className="card-text">{request.fulfillments?.map((fulfillment) => (
                  <div key={fulfillment.id}>
                    <p>{fulfillment.text}</p>
                    <p>{fulfillment.user?.username}</p>
                  </div>
                ))}</p>
              </div>
            </div>
            <form className='pt-2'>
                  <input className='form-control' value={text} onChange={(e) => setText(e.target.value)} />
                  <input className='form-control'  type="hidden" value={request_id} onChange={(e) => setRequest_id(e.target.value)} />
                  <button onClick={postData} className="btn btn-primary mt-2">Send</button>
                </form>
          </div>
        </div>
      </div>
      <form >

        <input className='form-control' value={name} onChange={(e) => setName(e.target.value)} />
        <input className='form-control'  type="hidden" value={request_id} onChange={(e) => setRequest_id(e.target.value)} />
        <button onClick={createRoom} className="btn btn-primary mt-2">Create Room</button>
      </form>
    </>
  );
};


export default RequestDetail