import React,{useState,useEffect} from 'react';
import L from 'leaflet';
import axios from 'axios';






const baseURL = "http://localhost:3001/api/v1/asks";

const markerIcon = new L.icon ({
  iconUrl: require("../../assets/images/money-box.png"),
  iconSize: [40,40]

});

const markerIcon2 = new L.icon ({
  iconUrl: require("../../assets/images/one-task.png"),
  iconSize: [40,40]

});

let marker;


function CustomMarker() {

const [data, setData] = useState ('');
const [kind,setKind] = useState ('') ;

useEffect (() => {
  axios.get(`http://localhost:3001/api/v1/asks`)
  .then (res => {
    setData(res.data)
    console.log(res.data)
  })
}, [])



if (kind === 'One time Task') {
  marker = markerIcon ;
  console.log("marker")
}else {
  marker = markerIcon2;
  console.log("no")
}

    return (
      <>
        <h1>data</h1>
      </>
        
    )

}

export default CustomMarker ;