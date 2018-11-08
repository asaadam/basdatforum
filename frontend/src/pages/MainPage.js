import React, { Component } from 'react'
import LandingPage from './ladingpage';
import DashBoard from './dashboard';
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
      <h1>you should login</h1>
      
      </div>
    )
  }
}
