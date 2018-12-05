import React, { Component } from 'react';
import Joi from 'joi';
import { Input, Form, FormGroup, Label, Button } from 'reactstrap';
import Ccard from './Cardd';
import { timingSafeEqual } from 'crypto';

// const schema = Joi.object().keys({
//   postTitle: Joi.string()
//     .string()
//     .max(60)
//     .required(),
//   postThread: Joi.string()
//     .required(),
// });
const URL_POST ='http://localhost:5000/api/editComment';

export default class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      done:false,
      errorMessage: "",
      idComment: this.props.location.state.idComment,
      initValue:'',
      Comment: [],
      comments:[]
    }
  }
  componentWillMount(){
    this.setState({loading: true});
    const body={
        idComment : this.state.idComment
    }
    console.log(body)
    fetch('http://localhost:5000/api/getComment',{
        method: 'POST',
        headers:{
        'content-type':'application/json',
        'authorization': localStorage.token
        },
        body:JSON.stringify(body)
    }).then( results => {
        return results.json();
    }).then(data => {
        this.setState({Comment:data});
        this.setState({initValue:data[0].comments});
        this.setState({loading: false});
    })
    console.log(this.state.Comment);
  }
  updateComment = (event) => {
    this.setState({ errorMessage: "" })
    this.setState({login:true})
    const body={
      idComment : this.state.Comment[0].idComment,
      comment : this.state.initValue
    }
    console.log(body)
    fetch (URL_POST,{
      method: 'PUT',
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

  render() {
      console.log(this.state.Comment[0]);
    return (
      <Form onSubmit={this.updateComment}>
     
            
          <FormGroup>
          <Label for="exampleText">Edit Comment</Label>
          <Input type="textarea" placeholder="What do u think?" name="postComment" id="postComment" value={this.state.initValue} onChange={input=>{this.setState({initValue:input.target.value})}}/>
              <Button>Comment</Button>
      </FormGroup>  
        
          
      </Form>
    )
  }
}
