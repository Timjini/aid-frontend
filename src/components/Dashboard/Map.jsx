// import React,{useState, useEffect} from 'react';
// import {MapContainer, TileLayer ,Marker,Popup} from 'react-leaflet';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
// import { Icon } from "leaflet";
// import '../styles/Home.css';
// import useAxios from '../../apis/useAxios';


// function Map() {


//   const [data, setData] = useAxios([]);



//   return (

//           <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
//             <TileLayer
//               attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//             />
//            {data.map(data => (
//               <Marker position={{ lat : data.latitude, lng : data.longitude}}>        
//               <Popup>
//                 A pretty CSS3 popup. <br /> Easily customizable.
//               </Popup>
//             </Marker>
//             ))}
//           </MapContainer>
//   );

// }

// export default Map;