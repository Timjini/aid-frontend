import React from 'react';
import { ChakraProvider, Box, theme } from '@chakra-ui/react';
//import { ColorModeSwitcher } from './ColorModeSwitcher';
import Main from './components/Main';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {API_WS_ROOT} from './constant/index';
import { ActionCableProvider }  from 'react-actioncable-provider';

import { AuthProvider } from './contexts/auth';
import { UserProvider } from './contexts/user';

function App(props) {
  return (
    <AuthProvider>
      <UserProvider>
        <ActionCableProvider url={API_WS_ROOT}>
          <ChakraProvider theme={theme}>
            <Box textAlign="center" fontSize="xl">
              <Main {...props} />
            </Box>
          </ChakraProvider>
        </ActionCableProvider>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;
