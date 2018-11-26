import React, { Component } from 'react'
import LandingPage from './ladingpage';
import DashBoard from './dashboard';
import { BrowserRouter as Router, Route, Link ,Redirect} from "react-router-dom";
import { decode } from 'punycode';
let jwt  = require('jsonwebtoken');
export default class MainPage extends Component {
    constructor(props){
        super(props);
        this.state={

        }
    }

  render() {

    if (localStorage.token){
      console.log(jwt.verify(localStorage.token,'asaadamyusufrakathariqnazhim',
      (err,decoded)=>{
        console.log(decoded)
      }))
      return(
          <DashBoard></DashBoard>
      )
    }else{
      return (
        <div>
          
        <h1>You Should Login To Use This Forum</h1>
          
        </div>
      )
    }
        
  }
}
