import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Register from '../pages/register';
import LoginPage from '../pages/loginPage';
import DashBoard from '../pages/dashboard';
export default class Login extends Component {
  render() {
    return (
      <div>
      <Route path={`/login`} component={LoginPage}/>
      <Route path={`/register`} component={Register}/>
      </div>
    )
  }
}
