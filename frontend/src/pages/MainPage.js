import React, { Component } from 'react'
import LandingPage from './ladingpage';
import DashBoard from './dashboard';
import { BrowserRouter as Router, Route, Link ,Redirect} from "react-router-dom";

export default class MainPage extends Component {
    constructor(props){
        super(props);
        this.state={

        }
    }

  render() {

    if (localStorage.token)
    return(
        <DashBoard></DashBoard>
    )

    return (
      <div>
        
      <h1>You Should Login To Use This Forum</h1>
        
      </div>
    )
  }
}
