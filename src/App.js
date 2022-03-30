import React from 'react';
import Main from './components/Main';
import { ChakraProvider, Box, Grid, theme } from '@chakra-ui/react';
import { AuthProvider } from './contexts/auth';
import { UserProvider } from './contexts/user';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';


function App(props) {
  return (
    <AuthProvider>
      <UserProvider>
      <ChakraProvider theme={theme}>
          <Box textAlign="center" fontSize="xl">
            {/* <Grid minH="100vh" p={3}>
        <ColorModeSwitcher justifySelf="flex-end" />
        </Grid> */}
            <Main {...props} />
          </Box>
        </ChakraProvider>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;
