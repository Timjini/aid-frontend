import React,{useEffect, useState} from 'react';
import {useMapEvents} from 'react-leaflet';
import LoadingScreen from './LoadingScreen';

const LocateUser = () => {


    const [loading, setLoading] = useState(true);
    useEffect(() => {
      setTimeout(() => setLoading(false), 4500)
    }, [])

        const map = useMapEvents({
          locationfound(e) {
           map.panTo(e.latlng, map.setView(e.latlng))
          }
        });
        useEffect(() => {
          map.loading = true;
          map.locate();
        }, [map]);
        if (loading) {
          return <LoadingScreen />; 
        }
        return null;
      };

export default LocateUser;

