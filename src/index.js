//import { ColorModeScript } from '@chakra-ui/react';
import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
//import GoogleApiWrapper from 'google-map-react';

// App = GoogleApiWrapper({
//   apiKey: "AIzaSyD8_QKqZNpfYJQqelOONNrLoK7Jb4em2mM",
//   language: "EN"
// })(App);


ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root')
);
