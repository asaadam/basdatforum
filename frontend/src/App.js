import React, { Component } from 'react';
import NavBar from './component/navbar';
import Home from './pages/home'
import './App.css';
import MainPage from './pages/MainPage';
import Detail from './pages/detail';
import Edit from './component/edit'
import { BrowserRouter as Router, Redirect ,Route,Switch} from "react-router-dom";


class App extends Component {
  render() {
   
    return (

        <div className="App">
        <NavBar>
        </NavBar>
        <MainPage>
        </MainPage>
        {(<Route path={`/dashboard`} component={Home}/> || <Route path={`/`} component={Home}/>)}
        <Route path={`/detail`} component={Detail}/>
        <Route path={`/edit`} component={Edit}/>

        </div>
     
    );
  }
}

export default App;
