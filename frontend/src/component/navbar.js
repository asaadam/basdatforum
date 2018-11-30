import React, { Component } from 'react'
import {NavItem,Button, Navbar,Container,NavbarBrand,Collapse,Nav } from 'reactstrap';
import Login from './login'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

 class NavBar extends Component {
    state={
        isOpen:false,
        modal: false
    }
    toggle =()=>{
        this.setState({
            isOpen :!this.state.isOpen
        });
    }
    logout=()=>{
      localStorage.clear();

    }

    render(){
      if(localStorage.token){
        return(
          <div>
        <Navbar color="primary" dark className="mb-5">
        <Container>
          <NavbarBrand href="/dashboard">Forum Basdat</NavbarBrand>
          <Link to={`/login`}>
          <Button color='warning' onClick={this.logout} >
          Logout
          </Button>
          </Link>
          
        </Container>
      </Navbar>
    </div>
    )
      }
        return(
            <div>
            <Navbar color="primary" dark className="mb-5">
              <Container>
                <NavbarBrand href="/dashboard">Forum Basdat</NavbarBrand>
                <Link to={`/login`}>
                <Button color='warning' onClick={this.toggle} >
                Login
                </Button>
                </Link>
                <Collapse isOpen={this.state.isOpen} navbar>
                  <Nav className="ml-auto" navbar>
                    <NavItem>
                     <Login>
                     
                     </Login>
                    </NavItem>
                  </Nav>
                </Collapse>
              </Container>
            </Navbar>
          </div>
        );

      }
    

   

 

}
export default NavBar;