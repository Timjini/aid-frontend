import React, {useEffect, useState, useRef} from 'react'
//import { GoogleMap, useJsApiLoader, Marker} from '@react-google-maps/api';
import {MapContainer, TileLayer ,Marker,Popup} from 'react-leaflet';
import '../styles/Home.css';
import axios from 'axios';
import L from 'leaflet';
import {API_REQUESTS} from '../../constant/index'
import 'leaflet/dist/leaflet.css';
import {useGeolocated} from 'react-geolocated';


function Location() {
const [request, setRequest] = useState([]);
const mapRef = useRef();
const { coords, isGeolocationAvailable, isGeolocationEnabled } =
useGeolocated({
    positionOptions: {
        enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
});

  useEffect (() => {
    axios.get(API_REQUESTS).then((response) => {
      setRequest(response.data);
    });
  }, []);


  const markerIcon = new L.icon ({
    iconUrl: require("../../assets/images/one-task.png"),
    iconSize: [40,40]
  
  });
  
  const markerIcon2 = new L.icon ({
    iconUrl: require("../../assets/images/money-box.png"),
    iconSize: [40,40]
  
  });

  
  return !isGeolocationAvailable ? (
    <div>Your browser does not support Geolocation</div>
) : !isGeolocationEnabled ? (
    <div>Geolocation is not enabled</div>
) : coords ? (
    <>
       <MapContainer  ref={mapRef} className='map' center={[coords.latitude,coords.longitude]} zoom={14} scrollWheelZoom={false}>
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
  ): (
    <div>Getting the location data&hellip; </div>
);
};
export default Location;