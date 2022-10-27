import React,{useState} from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import useAxios from '../../apis/useAxios';

const baseUrl = `http://localhost:3001/api/v1` || `https://hidden-eyrie-18402.herokuapp.com`;

function LocationMarker(){

    const {data , loading} = useAxios(`${baseUrl}/users/012b8996-cd30-4713-90c0-ec32a8316470`);

    return(
        <div>
            {loading && <div>Loading...</div>}

        </div>

    );
}

export default LocationMarker;