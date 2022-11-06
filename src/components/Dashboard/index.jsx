import React from "react";
import { Route, Switch } from "react-router-dom";
import { Box } from '@chakra-ui/react'
import Navbar from "../Common/Navbar";
import MainSection from "./MainSection";
import Profile from "./Account/Profile";
import AccountEdit from "./Account/AccountEdit";
import Requests from './Requests';
import Users from "./Users";
import MyRequests from "./MyRequests";
import RequestDetail from "./Requestdetail";
import ConversationsList from '../Chat/ConversationsList';
import Chat from '../Chat/Chat';
import Fulfillment from "./Fullfilment";
import { AuthProvider } from '../../contexts/auth';
import { UserProvider } from '../../contexts/user';
import CreateRoom from './CreateRoom';
import Footer from "../Common/Footer.tsx";
import DocumentUpload from './DocumentUpload';

const Home = ({cable}) => {

  return (
    <>
    
    <AuthProvider>
    <UserProvider>
      <Navbar />
      <Box>
        <Switch>
          <Route exact path="/home" component={MainSection} />
          <Route exact path="/upload" component={DocumentUpload} />
          <Route exact path="/" component={MainSection} />
          <Route path="/conversations" component={ConversationsList}  />
          <Route exact path="/account/edit" component={AccountEdit} />
          <Route exact path="/profile" component={Profile} />
          <Route path="/requests" exact component={Requests} />
          <Route exact path="/users" component={Users} />
          <Route path="/my-requests" exact component={MyRequests} />
          <Route path="/requests/:id" component={RequestDetail} />
          <Route path="/requests/:id/fulfillment/:id" component={Fulfillment} />
          <Route path="/fulfillments" component ={Fulfillment} />
          <Route path="/chat" component={Chat} />
          <Route path="/new-room" component={CreateRoom} />
        </Switch>
      </Box>
      <Footer />
    </UserProvider>
    </AuthProvider>
    </>
  );
};

export default Home;
