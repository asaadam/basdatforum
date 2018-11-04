import React, { Component } from "react";
import {
  Alert,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText
} from "reactstrap";
import Joi from "joi";
import { Route ,Redirect } from 'react-router-dom'

const schema = Joi.object().keys({
  username: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),
  password: Joi.string()
    .min(8)
    .required(),
    confirmPassword: Joi.string()
    .min(8)
    .required()
});
const URL_SINGUP ='http://localhost:5000/auth/signup';

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      done:false,
      signup:false,
      errorMessage: "",
      user: {
        username: "",
        password: "",
        confirmPassword: ""
      },
      
    };
    this.handleChange=this.handleChange.bind(this);
    this.validuser = this.validuser.bind(this);
    this.signup = this.signup.bind(this);
  }
  handleChange = e => {
    let inputName = e.target.name;
    let inputValue = e.target.value;
    let copyUser = Object.assign({}, this.state.user);
    copyUser[inputName]=inputValue;

    this.setState({user:copyUser});
  }

  validuser = () => {
    if (this.state.user.password !== this.state.user.confirmPassword) {
      this.setState({ errorMessage: "Password must be match" });
      this.setState({signup:false})
      return false;
    }
    const result = Joi.validate(this.state.user, schema);
    if (result.error === null) {
      return true;
    }

    if(result.error.message.includes('username')){
      this.setState({ errorMessage: "Username invalid" });
    }
    else{
      this.setState({ errorMessage: "Password invalid" });

    }
    return false;
  };

  signup = (event) => {
    this.setState({ errorMessage: "" });
    const body = {
      username:this.state.user.username,
      password:this.state.user.password
    }
    this.setState({signup:true})
    if (this.validuser()){
      fetch(URL_SINGUP,{
        method:'POST',
        body:JSON.stringify(body),
        headers:{
          'Content-Type':'application/json'
        }
      }).then(response=>{
        if(response.ok){
          return response.json();
          
        }
        return response.json().then(error=>{
          throw new Error(error.message);
        });
      }).then(user=>{
        console.log(user);
        this.setState({done:true})
        this.setState({signup:false})

      }).catch(error=>{
        this.setState({ errorMessage: error.message });
        this.setState({signup:false})

      });

    }

    event.preventDefault();
  };

  
  render() {
    if (this.state.done === true) {
      return <Redirect to='/login' />
    }
    return (
      
      <div>
      {this.state.signup&&(<img src={require('../asset/loading.svg')}></img>)}
     
        {this.state.errorMessage && (
          <Alert color="danger">{this.state.errorMessage}</Alert>
        )}
        <Form onSubmit={this.signup}>
          <FormGroup>
            <Label for="username">Username</Label>
            <Input
              type="text"
              name="username"
              id="username"
              placeholder="Your Username"
              required
              onChange={this.handleChange}
            />
            <FormText color="white">
              Username can only container alphanumeric , with minimum 3
              characters
            </FormText>
          </FormGroup>

          <FormGroup>
            <Label for="password">Password</Label>
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="Password "
              required
              onChange={this.handleChange}
            />
            <FormText color="white">
              Password must be 8 or more characters
            </FormText>
          </FormGroup>
          <FormGroup>
            <Label for="password">Re-Type Password</Label>
            <Input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="Re-Type Password "
              required
              onChange={this.handleChange}

            />
            <FormText color="white">Re-Type your password</FormText>
          </FormGroup>
          <Button>Register</Button>
        </Form>
        
      </div>
    );
  }
}
