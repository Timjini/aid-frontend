import React from 'react'
import { GoogleMap, useJsApiLoader, Marker} from '@react-google-maps/api';
import axios from 'axios';

const containerStyle = {
  width: '100vw',
  height: '50vh'
};

const baseURL = "http://localhost:3001/api/v1/requests";

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

  
  return (
    <>
      <GoogleMap
        mapContainerStyle={containerStyle}
        defaultCenter={ {lat: 44.9782, lng: 27.9784} }
        defaultZoom={3}
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
  )  
}

export default React.memo(Location)