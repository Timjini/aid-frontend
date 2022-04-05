import React from 'react'
import { GoogleMap, useJsApiLoader, Marker} from '@react-google-maps/api';
import axios from 'axios';

const containerStyle = {
  width: '100vw',
  height: '50vh'
};
const center = {
  lat: -3.745,
  lng: -38.523
};

const baseURL = "https://hidden-eyrie-18402.herokuapp.com/api/v1/asks";

function Location() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyD8_QKqZNpfYJQqelOONNrLoK7Jb4em2mM"
  })

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

const [request, setRequest] = React.useState(null);

  React.useEffect (() => {
    axios.get(baseURL).then((response) => {
      setRequest(response.data);
      console.log(request)
    });
  }, []);

  if(!request) return null;

  
  return isLoaded ?(
    <>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
              {request.map(request => (
                 <Marker 
                key={request.id}
                position= {{ lat : request.latitude, lng : request.longitude}}
                />
                ))}
              

      </GoogleMap>
      </>
  )  : <></>
}

export default React.memo(Location)