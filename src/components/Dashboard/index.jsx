import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { Box } from '@chakra-ui/react'
import Navbar from "../Common/Navbar";
import MainSection from "./MainSection";
import Profile from "./Account/Profile";
import AccountEdit from "./Account/AccountEdit";
import Requests from './Requests';
import Addrequest from './Addrequest';
import Calls from './Calls';
import Editrequest from "./Editrequest";

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
          <Route exact path="/calls" component={Calls} />
          <Route exact path="/editrequest" component={Editrequest} />
          <Redirect from="/" to="/home" />
        </Switch>
      </Box>
    </>
  );
};

export default Home;
