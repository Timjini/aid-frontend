import React from 'react';
// import Spinner from 'react-bootstrap/Spinner';
import '../styles/Home.css';


function LoadingScreen() {
  return (
  
    <div className="loading">
        <div className="spinnerCenter">
        <h1 className="search">Searching for nearest requests..</h1>
      </div>
  </div>
  )
}

export default LoadingScreen