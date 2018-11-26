import React, { Component } from 'react';
import Ccard from './Card';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';

export default class Cardd extends Component {
    constructor(props){
        super(props);
        this.state={
          post: [],
        }
        console.log(this.state.post);
    }
    
    componentDidMount(){
        fetch('http://localhost:5000/auth/getThread').then( results => {
            return results.json();
        }).then(data => {
            this.setState({post:data});
        })
    }

  
  render() {
    return (
      <div>
        
      </div>
    )
  }
}
