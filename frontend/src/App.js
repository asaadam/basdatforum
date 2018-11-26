import React, { Component } from 'react';
import NavBar from './component/navbar';
import DashBoard from './pages/dashboard'
import LandingPage from './pages/ladingpage'
import './App.css';
import { BrowserRouter as Router, Redirect ,Route,Switch} from "react-router-dom";
import MainPage from './pages/MainPage';
import Cardd from './component/Cardd';
import Post from './component/Post';



class App extends Component {
  render() {
   
    return (

        <div className="App">
        <NavBar>
        </NavBar>
        <MainPage>
        </MainPage>
        {localStorage.token && 
        <Post>
        </Post>}
        {localStorage.token && 
        <Cardd>
        </Cardd>}

        </div>
     
    );
  }
}

export default App;
