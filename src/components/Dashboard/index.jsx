import React from "react";
import { Route, Switch } from "react-router-dom";
import { Box } from '@chakra-ui/react'
import Navbar from "../Common/Navbar";
import MainSection from "./MainSection";
import Profile from "./Account/Profile";
import AccountEdit from "./Account/AccountEdit";
import Requests from './Requests';
import Rooms from "./Rooms";
import Messages from "./Messages";
import LocationMarker from "./LocationMarker";
import Users from "./Users";
import MyRequests from "./MyRequests";
import RequestDetail from "./Requestdetail";
import ConversationsList from '../Chat/ConversationsList';
import Chat from '../Chat/Chat';
import Fulfillment from "./Fullfilment";

const Home = ({cable}) => {

  return (
    <>
      <Navbar />
      <Box>
        <Switch>
          <Route exact path="/" component={MainSection} />
          <Route path="/conversations" component={ConversationsList}  />
          <Route exact path="/account/edit" component={AccountEdit} />
          <Route exact path="/profile" component={Profile} />
          <Route path="/requests" exact component={Requests} />
          <Route exact path="/rooms/:id" component={Rooms} />
          <Route exact path="/messages" component={Messages} />
          <Route exact path="/location" component={LocationMarker} />
          <Route exact path="/users" component={Users} />
          <Route path="/my-requests" exact component={MyRequests} />
          <Route path="/requests/:id" component={RequestDetail} />
          <Route path="/fulfillment" component ={Fulfillment} />
          <Route path="/chat" component={Chat} />
        </Switch>
      </Box>
    </>
  );
};

export default Home;
