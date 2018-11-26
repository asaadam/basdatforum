import React, { Component } from 'react';
import Ccard from './Card';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';

export default class Cardd extends Component {
    constructor(props){
        super(props);
        this.state={
          post: [],
          loading: false
        }
        console.log(localStorage.token);
    }
    componentDidMount(){
      this.setState({loading: true});
        fetch('http://localhost:5000/api/getThread',{
          headers:{
            'content-type':'application/json',
            'authorization': localStorage.token
          },
        }).then( results => {
            return results.json();
        }).then(data => {
            this.setState({post:data});
            this.setState({loading: false});
        })
        console.log(this.state.post);
    }
    
    newPost(){
      this.setState({loading: true});

      this.newPost.set({
        title: this.state.post.title,
        post: this.state.post.post,
        username: this.state.post.username,
        currentTimeStamp: this.state.post.currentTimeStamp
      });

      this.setState({loading: false});
    }
  render() {
    console.log(this.state.post);
    return (
      <div>
        {this.state.loading&&(<img src={require('../asset/loading.svg')}></img>)}
        {this.state.post.map(post => (
            <Ccard
              
              {...post}
            />
          ))}
      </div>
    )
  }
}
