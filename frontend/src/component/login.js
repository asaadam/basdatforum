import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Regsiter from '../pages/register';
import LoginPage from '../pages/loginPage';
export default class Login extends Component {
  render() {
    return (
      <div>
        <Route path={`/login`} component={LoginPage}/>
        <Route path={`/register`} component={Regsiter}/>
      </div>
    )
  }
}
