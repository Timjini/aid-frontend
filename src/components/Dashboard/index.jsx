import React from "react";
import { Route, Switch } from "react-router-dom";
import { Box } from '@chakra-ui/react'
import Navbar from "../Common/Navbar";
import MainSection from "./MainSection";
import AccountEdit from "./Account/AccountEdit";
import MyRequests from "./MyRequests";
import RequestDetail from "./Requestdetail";
import Footer from "../Common/Footer.tsx";
import Profile from "./Account/Profile";

import Location from "./Location";

const Home = ({cable}) => {

  return (
    <>
    
      <Navbar />
      <Box>
        <Switch>
          <Route exact path="/home" component={MainSection} />
          <Route exact path="/" component={MainSection} />
          <Route exact path="/account/edit" component={AccountEdit} />
          <Route path="/requests" exact component={Location} />
          <Route path="/my-requests" exact component={MyRequests} />
          <Route path="/requests/:id" component={RequestDetail} />
          <Route path="/profile" component={Profile} />
        </Switch>
      </Box>
      <Footer />
    </>
  );
};

export default Home;
