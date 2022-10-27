import React,{useState, useEffect} from "react";
import { Route, Redirect, Switch } from "react-router-dom";
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
import Chat from "../Chat/Chat";


const Home = () => {
  
  return (
    <>
      <Navbar />
      <Box>
        <Switch>
          <Route exact path="/" component={MainSection} />
          <Route exact path="/account/edit" component={AccountEdit} />
          <Route exact path="/profile" component={Profile} />
          <Route path="/requests" exact component={Requests} />
          <Route exact path="/rooms/:id" component={Rooms} />
          <Route exact path="/messages" component={Messages} />
          <Route exact path="/location" component={LocationMarker} />
          <Route exact path="/users" component={Users} />
          <Route exact path="/my-requests" component={MyRequests} />
          <Route exact path="/requests/:id" component={RequestDetail} />
          <Route exact path="/chat" component={Chat} />
        </Switch>
      </Box>
    </>
  );
};

export default Home;
