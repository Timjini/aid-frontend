import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ActionCableProvider } from 'react-actioncable-provider';
import {API_WS_ROOT} from './constant/index'
import ActionCable from 'actioncable';
//import { useUserState } from './contexts/user';


const cable = ActionCable.createConsumer(`${API_WS_ROOT}`);
console.log(cable);
ReactDOM.render(
  <StrictMode>
    <ActionCableProvider cable={cable}>
      <App  />
    </ActionCableProvider>
      </StrictMode>,
  document.getElementById('root')
);
