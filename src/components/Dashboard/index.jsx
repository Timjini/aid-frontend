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
import Chat from "./Chat";
import Location from "./Location";

const Home = ({cable}) => {
  function createSocket() {
    const socket_url = "ws://localhost:3001/cable";
    const socket = new WebSocket(socket_url);
    socket.onopen = () => {
      console.log("Connected to socket");
      const msg = {
        command: "subscribe",
        identifier: JSON.stringify({
          channel: "MessagesChannel",
        }),
    };
    socket.send(JSON.stringify(msg));
    }
    socket.onmessage = (e) => {
      const data = JSON.parse(e.data);
      if (data.type === "ping") {
        return;
      }
      if (data.message) {
        console.log(data.message);
      }
    }
    socket.onerror = (err) => {
      console.log(err);
    };
  }
  createSocket();

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
          <Route path={`/fulfillments/:id`} component={Chat} />
          <Route path="/profile" component={Profile} />
        </Switch>
      </Box>
      <Footer />
    </>
  );
};

export default Home;
