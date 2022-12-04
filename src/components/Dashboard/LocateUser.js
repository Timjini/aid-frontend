import React,{useEffect, useState} from 'react';
import {useMapEvents} from 'react-leaflet';

const LocateUser = () => {

    const [loading, setLoading] = useState(true);

        const map = useMapEvents({
          locationfound(e) {
           map.panTo(e.latlng, map.flyTo(e.latlng))
          }
        });
        useEffect(() => {
          map.loading = true;
          map.locate();

      
        }, [map]);
        return null;
      };

export default LocateUser;

