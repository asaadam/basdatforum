import React, { Component } from 'react';
import Joi from 'joi';
import { Input, Form, FormGroup, Label, Button } from 'reactstrap';
import Ccard from './Cardd';

// const schema = Joi.object().keys({
//   postTitle: Joi.string()
//     .string()
//     .max(60)
//     .required(),
//   postThread: Joi.string()
//     .required(),
// });
const URL_POST ='http://localhost:5000/api/postThread';

export default class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      done:false,
      errorMessage: "",
      post: {
        postTitle: "",
        postThread: "",
      },
    }
  }
  login = (event) => {
    this.setState({ errorMessage: "" })
    this.setState({login:true})
    const body={
      title : this.state.post.postTitle,
      post : this.state.post.postThread
    }
    console.log('post title : ' + this.state.post.postTitle);
    fetch (URL_POST,{
      method: 'POST',
      headers:{
        'content-type':'application/json',
        'authorization': localStorage.token
      },
      body:JSON.stringify(body),
    }).then(response=>{
      if(response.ok){
        return response.json();
        
      }
      return response.json().then(error=>{
        throw new Error(error.message);
      });
    }).catch(error=>{
      console.log('fetch error'+error)
      this.setState({ errorMessage: error.message });
      this.setState({login:false})

    });

    event.preventDefault();

  }

  handleChange = e => {
    let inputName = e.target.name;
    let inputValue = e.target.value;
    let copyPost = Object.assign({}, this.state.post);
    console.log(copyPost);
    copyPost[inputName] = inputValue;
    this.setState({ post: copyPost });
    console.log(this.state.post);
    
  }

  render() {
    return (
      <Form onSubmit={this.login}>
          <FormGroup>
            <Label for="exampleText">Text Area</Label>
            <Input type="text" placeholder="Thead Title" name="postTitle" id="threadTitle" onChange={this.handleChange}/>
            <Input type="textarea" placeholder="What do u think?" name="postThread" id="postThread" onChange={this.handleChange}/>
            <Button>Post Thread</Button>
        </FormGroup>
      </Form>
    )
  }
}
