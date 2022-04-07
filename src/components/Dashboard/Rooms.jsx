import React from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import useAxios from '../../apis/useAxios';
import Messages from './Messages';

const baseUrl = 'http://localhost:3001/';
//const baseUrl = 'https://hidden-eyrie-18402.herokuapp.com/';
 
function Rooms() {
  const { id } = useParams();
  const {data , loading} = useAxios(`${baseUrl}api/v1/rooms`+ id);

  return (
    <><div className='p-5'>
      {loading && <div>Loading ....</div>}
      {data && (
        <>
          <h2> {data.name}</h2>
        </>
      )}

    </div><Messages /></>

  );
}
export default Rooms

