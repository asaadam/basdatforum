import React, { Component } from 'react';
import NavBar from './component/navbar'
import './App.css';
import { BrowserRouter as Router } from "react-router-dom";


class App extends Component {
  render() {
    return (
      <Router >
      <div className="App">
      <NavBar></NavBar>

        <h1>Please Login Before You Can Use This Forum</h1>
      </div>
      </Router>
    );
  }
}

export default App;
