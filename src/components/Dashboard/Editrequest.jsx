import React, { Component } from "react";
import axios from "axios";
//import { useHistory } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';


export default class Editrequest extends Component {
  constructor(props){
    super(props)

    this.state = {
      requests:[]
    }
  }

  handleChange = (e) => {
    this.setState({ 
      [e.target.name]: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`https://hidden-eyrie-18402.herokuapp.com/api/v1/requests/54`, this.state)
    .then(response =>{
      console.log(response)
    })
  }

  render() {
    return (
        <>
        <Container>
        <Form onSubmit={this.handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="inputPassword5">Address</Form.Label>
              <Form.Control
                  type="text" 
                  name="address" 
                  onChange={this.handleChange}
                  placeholder="address"
              />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label htmlFor="inputPassword5">Description</Form.Label>
                  <Form.Control
                    type="text" 
                    name="description" 
                    onChange={this.handleChange}
                    placeholder="description"
                   />
                    <Form.Text id="passwordHelpBlock" muted>
                    Describe the Help you need to get a quick response to your query. 
                </Form.Text>
            </Form.Group>
            <Button type="submit">Submit</Button>
        </Form>
        </Container>
        </>
    )
  }
}