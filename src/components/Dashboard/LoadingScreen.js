import React from 'react';
// import Spinner from 'react-bootstrap/Spinner';
import '../styles/Home.css';
import { Spinner } from '@chakra-ui/react'


function LoadingScreen() {
  return (
  
    <div className="loading">
        <div className="spinnerCenter">
          <Spinner
            thickness='4px'
            speed='0.65s'
            emptyColor='gray.200'
            color='teal'
            size='xl'
          />
      </div>
  </div>
  )
}

export default LoadingScreen