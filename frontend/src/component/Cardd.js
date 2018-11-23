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
        console.log(props);
    }
    componentDidMount(){
        fetch('http://localhost:5000/post/getThread').then( results => {
            return results.json();
        }).then(data => {
            this.setState({post:data});
        })
    }
  render() {
    return (
      <div>
        {this.state.post.map(post => (
            <Ccard
              
              {...post}
            />
          ))}
     
      </div>
    )
  }
}
