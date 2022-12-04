import React, {useEffect, useState, useRef} from 'react';
import {MapContainer, TileLayer ,Marker,Popup, useMapEvents,useMap} from 'react-leaflet';
import '../styles/Home.css';
import axios from 'axios';
import L from 'leaflet';
import {API_FULFILLMENTS, API_REQUESTS} from '../../constant/index'
import 'leaflet/dist/leaflet.css';
import {
  chakra,
  Flex,
  SimpleGrid,
} from '@chakra-ui/react';
import CreateRequest from './CreateRequest';
import { Link, useHistory } from 'react-router-dom';
import "leaflet/dist/leaflet.css";
import LocateUser from './LocateUser';

function Location() {
const [request, setRequest] = useState([]);
const mapRef = useRef();
const [currentBoundaries, setCurrentBoundaries] = useState(null);
const [fulfillement, setFulfillement] = useState([]);
const ref = useRef();
const history = useHistory();
const [loading, setLoading] = useState(false);




  const markerIcon = new L.icon ({
    iconUrl: require("../../assets/images/one-task.png"),
    iconSize: [40,40]
  
  });
  
  const markerIcon2 = new L.icon ({
    iconUrl: require("../../assets/images/money-box.png"),
    iconSize: [40,40]
  
  });
 const InnerComponent = ({setBoundaries}) => { 
    useMapEvents({
        moveend() {
          const map = mapRef.current;
          if (map != null) {
            const { _southWest, _northEast } = map.getBounds();
            setBoundaries({
              _southWest: [_southWest.lat, _southWest.lng],
              _northEast: [_northEast.lat, _northEast.lng],
            });
          }
        },
        dragend() {
          const map = mapRef.current;
          if (map != null) {
            const { _southWest, _northEast } = map.getBounds();
            setBoundaries({
              _southWest: [_southWest.lat, _southWest.lng],
              _northEast: [_northEast.lat, _northEast.lng],
            });
          }
        }
    });
    return null;
 };


 const fetchRequests = async () => {
  const res = await axios.get(API_REQUESTS);
  setRequest(res.data);
  console.log(res.data);
};

useEffect(() => {
  fetchRequests();
  setLoading(true);
}, []);




const handleSubmit = async (e) => {
  e.preventDefault();
  let request_id = ref.current.value;
  axios.post((API_FULFILLMENTS), {request_id})
  .then((res) => {
    console.log(res)
    setFulfillement(res.data);
  }
  ).then (history.push(`/requests/${request_id}`))
};


  return (
    <>
      {(
       <MapContainer  ref={mapRef} className='map' center={[41.0082,28.9784]} zoom={16} scrollWheelZoom={false} zoomAnimation={false}>
           <LocateUser />
            <InnerComponent setBoundaries={setCurrentBoundaries} />
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
           {request.map((request , index) => {
              if( request.kind === 'onetime')
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
      )}
          <CreateRequest />
          <div className='container'>
          <SimpleGrid
        columns={{ base: 1, xl: 2 }}
        spacing={'20'}
        mt={16}
        mx={'auto'}>
          {request.map((request) => { 
            if (request.latitude >= mapRef.current.getBounds()._southWest.lat &&
            request.latitude <= mapRef.current.getBounds()._northEast.lat &&
            request.longitude >= mapRef.current.getBounds()._southWest.lng &&
            request.longitude <= mapRef.current.getBounds()._northEast.lng)
            return (
                <Flex
                key={request.id}
                boxShadow={'lg'}
                maxW={'640px'}
                direction={{ base: 'column-reverse', md: 'row' }}
                width={'full'}
                rounded={'xl'}
                p={10}
                justifyContent={'space-between'}
                position={'relative'}
                bg="#808080"
                color='white'
                _after={{
                  content: '""',
                  position: 'absolute',
                  height: '21px',
                  width: '29px',
                  left: '35px',
                  top: '-10px',
                  backgroundSize: 'cover',
                  backgroundImage: `url("data:image/svg+xml, %3Csvg xmlns='http://www.w3.org/2000/svg' width='29' height='21' viewBox='0 0 29 21' fill='none'%3E%3Cpath d='M6.91391 21C4.56659 21 2.81678 20.2152 1.66446 18.6455C0.55482 17.0758 0 15.2515 0 13.1727C0 11.2636 0.405445 9.43939 1.21634 7.7C2.0699 5.91818 3.15821 4.3697 4.48124 3.05454C5.84695 1.69697 7.31935 0.678787 8.89845 0L13.3157 3.24545C11.5659 3.96667 9.98676 4.94242 8.57837 6.17273C7.21266 7.36061 6.25239 8.63333 5.69757 9.99091L6.01766 10.1818C6.27373 10.0121 6.55114 9.88485 6.84989 9.8C7.19132 9.71515 7.63944 9.67273 8.19426 9.67273C9.34658 9.67273 10.4776 10.097 11.5872 10.9455C12.7395 11.7939 13.3157 13.1091 13.3157 14.8909C13.3157 16.8848 12.6542 18.4121 11.3311 19.4727C10.0508 20.4909 8.57837 21 6.91391 21ZM22.5982 21C20.2509 21 18.5011 20.2152 17.3488 18.6455C16.2391 17.0758 15.6843 15.2515 15.6843 13.1727C15.6843 11.2636 16.0898 9.43939 16.9007 7.7C17.7542 5.91818 18.8425 4.3697 20.1656 3.05454C21.5313 1.69697 23.0037 0.678787 24.5828 0L29 3.24545C27.2502 3.96667 25.6711 4.94242 24.2627 6.17273C22.897 7.36061 21.9367 8.63333 21.3819 9.99091L21.702 10.1818C21.9581 10.0121 22.2355 9.88485 22.5342 9.8C22.8756 9.71515 23.3238 9.67273 23.8786 9.67273C25.0309 9.67273 26.1619 10.097 27.2715 10.9455C28.4238 11.7939 29 13.1091 29 14.8909C29 16.8848 28.3385 18.4121 27.0155 19.4727C25.7351 20.4909 24.2627 21 22.5982 21Z' fill='%239F7AEA'/%3E%3C/svg%3E")`,
                }}
                _before={{
                  content: '""',
                  position: 'absolute',
                  zIndex: '-1',
                  height: 'full',
                  maxW: '640px',
                  width: 'full',
                  filter: 'blur(40px)',
                  transform: 'scale(0.98)',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover',
                  top: 0,
                  left: 0,
                  backgroundImage: 'url("data:image/svg+xml, %3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'560\' height=\'185\' viewBox=\'0 0 560 185\' fill=\'none\'%3E%3Cellipse cx=\'102.633\' cy=\'61.0737\' rx=\'102.633\' ry=\'61.0737\' fill=\'%23ED64A6\' /%3E%3Cellipse cx=\'399.573\' cy=\'123.926\' rx=\'102.633\' ry=\'61.0737\' fill=\'%23F56565\' /%3E%3Cellipse cx=\'366.192\' cy=\'73.2292\' rx=\'193.808\' ry=\'73.2292\' fill=\'%2338B2AC\' /%3E%3Cellipse cx=\'222.705\' cy=\'110.585\' rx=\'193.808\' ry=\'73.2292\' fill=\'%23ED8936\' /%3E%3C/svg%3E")',
                }}>
                <Flex
                  direction={'column'}
                  textAlign={'left'}
                  justifyContent={'space-between'}>
                  <chakra.p
                    fontFamily={'Inter'}
                    fontWeight={'medium'}
                    fontSize={'15px'}
                    pb={4}>
                    {request.description}<br />
                    Address :{request.address}
                  </chakra.p>
                  <chakra.p fontFamily={'Work Sans'} fontWeight={'bold'} fontSize={14}>
                    Requested by: {request.user.username}
                    <chakra.span
                      fontFamily={'Inter'}
                      fontWeight={'medium'}
                      color='white'>
                      {' '}
                    </chakra.span><br />
                  </chakra.p>
                  <form onSubmit={handleSubmit}>
                      <input ref={ref} defaultValue={request.id} hidden={true} />
                      <button
                      type='submit'
                      className="btn btn-primary mt-2"
                      >
                      Help
                    </button>
                    </form>
                    <Link to={`/requests/${request.id}`}>
                      View Request
                    </Link>
                </Flex>

              </Flex>
            )
            
            else return loading

          })}
          </SimpleGrid>
          </div>


      </>
  )
}

export default Location;