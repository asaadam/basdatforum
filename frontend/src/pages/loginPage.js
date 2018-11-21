import React, { Component } from 'react'
import { Alert, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { BrowserRouter as Router, Route, Link ,Redirect} from "react-router-dom";
import Joi from "joi";
import DashBoard from '../pages/dashboard';


const schema = Joi.object().keys({
  username: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),
  password: Joi.string()
    .min(8)
    .required(),
});


const URL_LOGIN ='http://localhost:5000/auth/login';


export default class LoginPage extends Component {


  constructor(props) {
    super(props);
    this.state = {
      done:false,
      login: false,
      errorMessage: "",
      user: {
        username: "",
        password: "",
      },
    }
  }

  login = (event) => {
    this.setState({ errorMessage: "" })
    this.setState({login:true})
    if (this.validuser()) {
      const body={
        username : this.state.user.username,
        password : this.state.user.password
      }
      
      fetch (URL_LOGIN,{
        method: 'POST',
        headers:{
          'content-type':'application/json'
        },
        body:JSON.stringify(body),
      }).then(response=>{
        if(response.ok){
          return response.json();
          
        }
        return response.json().then(error=>{
          throw new Error(error.message);
        });
      }).then(token=>{
        localStorage.token=token;
        this.setState({done:true});
        this.setState({login:false});
        this.props.history.replace('/dashboard')
      }).catch(error=>{
        console.log('fetch error'+error)
        this.setState({ errorMessage: error.message });
        this.setState({login:false})

      });
    }

    event.preventDefault();

  }
  handleChange = e => {
    let inputName = e.target.name;
    let inputValue = e.target.value;
    let copyUser = Object.assign({}, this.state.user);
    copyUser[inputName] = inputValue;

    this.setState({ user: copyUser });
  }

  validuser = () => {

    const result = Joi.validate(this.state.user, schema);
    if (result.error === null) {
      return true;
    }
    console.log(result);
    if (result.error.message.includes('username')) {
      this.setState({ errorMessage: "Username invalid" });
      this.setState({login:false})
    }
    else {
      this.setState({ errorMessage: "Password invalid" });
      this.setState({login:false})

    }
    return false;
  };
  render() {
   
    return (
      <div>
            <Route path={`/dashboard`} component={DashBoard}/>

        {this.state.login&&(<img src={require('../asset/loading.svg')}></img>)}
        {this.state.errorMessage && (
          <Alert color="danger">{this.state.errorMessage}</Alert>
        )}
        <Form onSubmit={this.login}>
          <FormGroup>
            <Label for="username">Username</Label>
            <Input
              type="username"
              name="username"
              id="username"
              placeholder="Your Username"
              onChange={this.handleChange} />
          </FormGroup>
          <FormGroup>
            <Label for="examplePassword">Password</Label>
            <Input
              type="password"
              name="password"
              id="examplePassword"
              placeholder="Your Password "
              onChange={this.handleChange}
            />
          </FormGroup>
          <Button>
            Login
        </Button>
          <FormText color="muted">
            Doesn't have an account? register <Link style={{ color: 'white' }} to={`/register`}>here</Link>
          </FormText>
        </Form>
      </div>
    )
  }
}
