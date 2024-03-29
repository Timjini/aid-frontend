import React from 'react';
import { ChakraProvider, Box, theme } from '@chakra-ui/react';
//import { ColorModeSwitcher } from './ColorModeSwitcher';
import Main from './components/Main';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from './contexts/auth';
import { UserProvider } from './contexts/user';

function App(props) {
 

  return (
    <AuthProvider>
      <UserProvider>
           <ChakraProvider theme={theme}>
           <Box textAlign="center" fontSize="xl">
             <Main {...props} />
           </Box>
         </ChakraProvider>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;
