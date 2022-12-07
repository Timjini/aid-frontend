import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ActionCableProvider } from 'react-actioncable-provider';
// import {API_WS_ROOT} from './constant/index'
// import ActionCable from 'actioncable';


// const cable = ActionCable.createConsumer(`${API_WS_ROOT}`);

ReactDOM.render(

    // <ActionCableProvider cable={cable}>
    //   <App  />
    // </ActionCableProvider>
    <App />
  ,
  document.getElementById('root')
);
