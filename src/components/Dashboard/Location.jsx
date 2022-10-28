import React, {useEffect, useState} from 'react'
//import { GoogleMap, useJsApiLoader, Marker} from '@react-google-maps/api';
import {MapContainer, TileLayer ,Marker,Popup} from 'react-leaflet';
import '../styles/Home.css';
import axios from 'axios';
import L from 'leaflet';



const baseURL = "http://localhost:3001/api/v1/requests" ||"https://hidden-eyrie-18402.herokuapp.com/api/v1/requests";


function Location() {

const [request, setRequest] = useState([]);


  useEffect (() => {
    axios.get(baseURL).then((response) => {
      setRequest(response.data);
    });
  }, []);


  const markerIcon = new L.icon ({
    iconUrl: require("../../assets/images/money-box.png"),
    iconSize: [40,40]
  
  });
  
  const markerIcon2 = new L.icon ({
    iconUrl: require("../../assets/images/one-task.png"),
    iconSize: [40,40]
  
  });

  
  return (
    <>
       <MapContainer  className='map' center={[41.0082, 28.9784]} zoom={4} scrollWheelZoom={false}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
           {request.map((request , index) => {
              if( request.kind === 'onetime' )
              return (
              <Marker key={request.id} position={{ lat : request.latitude, lng : request.longitude}} icon = {markerIcon}>        
              <Popup>
                 {request.description} & {request.kind}
              </Popup>
            </Marker>
            )
            else
            return (
            <Marker key={request.id} position={{ lat : request.latitude, lng : request.longitude}} icon = {markerIcon2}>        
              <Popup>
                 {request.description} & {request.kind}
              </Popup>
            </Marker>
            )

           }
              
            )}
          </MapContainer>
      </>
  ) 
}

export default Location;