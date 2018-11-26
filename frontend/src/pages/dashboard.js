import React, { Component } from 'react';
var jwt  = require('jsonwebtoken');
let username = jwt.decode(localStorage.token);
console.log(username);

export default class DashBoard extends Component { 
    constructor(props){
        super(props);
        console.log(props);
    }   
    
    render() {
        return (
            <div>
               <h1>Hello {username.username}</h1>
            </div>
        )
    }
}
