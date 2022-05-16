import React, {useEffect, useState} from 'react'
//import { GoogleMap, useJsApiLoader, Marker} from '@react-google-maps/api';
import {MapContainer, TileLayer ,Marker,Popup} from 'react-leaflet';
import '../styles/Home.css';
import axios from 'axios';
import CustomMarker from './CustomMarker';
import L from 'leaflet';




//const baseURL = "http://localhost:3001/api/v1/asks" 
const baseURL = "https://hidden-eyrie-18402.herokuapp.com/api/v1/asks"



// const kind = 'One time Task' ;

const markerIcon = new L.icon ({
  iconUrl: require("../../assets/images/money-box.png"),
  iconSize: [40,40]

});

// const markerIcon2 = new L.icon ({
//   iconUrl: require("../../assets/images/one-task.png"),
//   iconSize: [40,40]

// });

// let marker;

// if (kind === 'One time Task') {
//   marker = markerIcon ;
//   console.log("marker")
// }else {
//   marker = markerIcon2;
//   console.log("no")
// }




function Location() {

const [request, setRequest] = useState([]);

  useEffect (() => {
    axios.get(baseURL).then((response) => {
      setRequest(response.data);
      console.log(request)
    });
  }, []);

  
  return (
    <>
       <MapContainer center={[41.0082, 28.9784]} zoom={10} scrollWheelZoom={false}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
           {request.map((request , index) => (
              <Marker key={request.id} position={{ lat : request.latitude, lng : request.longitude}} icon = {markerIcon}>        
              <Popup>
                 {request.description}
              </Popup>
            </Marker>
            ))}
          </MapContainer>
          <CustomMarker />
      </>
  ) 
}

export default Location;