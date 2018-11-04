import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input,FormText } from 'reactstrap';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default class LoginPage extends Component {
  render() {
    return (
        <Form>
        <FormGroup>
          <Label for="username">Username</Label>
          <Input type="username" name="username" id="username" placeholder="Your Username" />
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword">Password</Label>
          <Input type="password" name="password" id="examplePassword" placeholder="Your Password " />
        </FormGroup>
        <Button>
            Login
        </Button>
        <FormText color="muted">
        Doesn't have an account? register <Link style ={{color:'white'}}to={`/register`}>here</Link>
          </FormText>
        </Form>
    )
  }
}
