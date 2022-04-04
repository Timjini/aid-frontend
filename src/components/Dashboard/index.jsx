import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { Box } from '@chakra-ui/react'
import Navbar from "../Common/Navbar";
import MainSection from "./MainSection";
import Profile from "./Account/Profile";
import AccountEdit from "./Account/AccountEdit";
import Requests from './Requests';
import Addrequest from './Addrequest';
import Editrequest from "./Editrequest";
import Rooms from "./Rooms";
import Messages from "./Messages";

const Home = () => {
  return (
    <>
      <Navbar />
      <Box>
        <Switch>
          <Route exact path="/home" component={MainSection} />
          <Route exact path="/account/edit" component={AccountEdit} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/requests" component={Requests} />
          <Route exact path="/addrequest" component={Addrequest} />
          <Route exact path="/editrequest" component={Editrequest} />
          <Route exact path="/rooms/:id" component={Rooms} />
          <Route exact path="/messages" component={Messages} />
          <Redirect from="/" to="/home" />
        </Switch>
      </Box>
    </>
  );
};

export default Home;
