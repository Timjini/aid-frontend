import React,{useEffect, useState} from 'react';
import {useMapEvents} from 'react-leaflet';
import LoadingScreen from './LoadingScreen';

const LocateUser = () => {


    const [loading, setLoading] = useState(true);
    
    // loading screen only on window load
      useEffect(() => {
        setTimeout(() => setLoading(false), 4500)
    }, [])


    
        const map = useMapEvents({
          locationfound(e) {
           map.panTo(e.latlng, map.setView(e.latlng))
           //save location to user session 
            sessionStorage.setItem('userLocation', JSON.stringify(e.latlng));
            localStorage.setItem('userLocation', JSON.stringify(e.latlng));
            map.loading = false;
            setLoading(false);
          },
        })

        useEffect(() => {
          map.locate()
        }, [map])

        if (loading) {
          return <LoadingScreen />; 
        }
        else if (!loading){
        return null;
      }
      };

export default LocateUser;