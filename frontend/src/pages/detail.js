import React, { Component } from 'react'
import { Container, Card, CardImg, CardText, CardBody, CardLink,
  CardTitle, CardSubtitle } from 'reactstrap';
import { Input, Form, FormGroup, Label, Button } from 'reactstrap';


export default class Detail extends Component {  
  constructor(props){
    super(props);
    this.state={
      post: [],
      comment:[],
      comments:[],
      loading: false,
      errorMessage: "",
      login: false
    }
    console.log(localStorage.token);
  }
  componentDidMount(){
    const body ={
      idThread : this.props.location.search.substring(1)
    }
    this.setState({loading: true});
      fetch('http://localhost:5000/api/getAThread',{
        method: 'POST',
        headers:{
          'content-type':'application/json',
          'authorization': localStorage.token
        },
        body:JSON.stringify(body)
      }).then( results => {
          return results.json();
      }).then(data => {
          console.log(data);
          this.setState({post:data});
          this.setState({loading: false});
      })
      console.log(this.state.post);
      this.setState({loading: true});
      fetch('http://localhost:5000/api/getAComment',{
        method: 'POST',
        headers:{
          'content-type':'application/json',
          'authorization': localStorage.token
        },
        body:JSON.stringify(body)
      }).then( results => {
          return results.json();
      }).then(data => {
          console.log(data);
          this.setState({comment:data});
          this.setState({loading: false});
      })
      console.log(this.state.comment);
  } 
  komen = (event) => {
    let URL_POST = 'http://localhost:5000/api/postComment';
    this.setState({ errorMessage: "" })
    this.setState({login:true})
    const body={
      idThread : this.props.location.search.substring(1),
      comment : this.state.comments.postComment
    }
    console.log(body);
    console.log('post comment : ' + this.state.comments.postcomment);
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
    let copyPost = Object.assign({}, this.state.comments);
    console.log(copyPost);
    copyPost[inputName] = inputValue;
    this.setState({ comments: copyPost });
    console.log(this.state.comments);
    
  }
  render() {
    console.log(this.state.comment);
    return (
      <div>
        <Container>
          {this.state.loading&&(<img src={require('../asset/loads.svg')}></img>)}
          {this.state.post.map(post => (
              <Card>
              <CardBody>
                <CardTitle>{post.title}</CardTitle>
                <CardSubtitle>{post.username}</CardSubtitle>
              {/* </CardBody>
              <img width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
              <CardBody> */}
                <CardText>{post.post}</CardText>
              </CardBody>
            </Card>
          ))}
          <Form onSubmit={this.komen}>
            <FormGroup>
              <Label for="exampleText">Post Comment</Label>
              <Input type="textarea" placeholder="What do u think?" name="postComment" id="postComment" onChange={this.handleChange}/>
              <Button>Comment</Button>
            </FormGroup>
          </Form>
          <h2>Comments</h2>
          {this.state.comment.map(komen => (
              <Card>
              <CardBody>
                <CardTitle>{komen.idUser}</CardTitle>
                <CardSubtitle>{komen.comments}</CardSubtitle>
              {/* </CardBody>
              <img width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
              <CardBody> */}
                <CardText>{komen.currentTimeStamp}</CardText>
              </CardBody>
            </Card>
          ))}
        
        </Container>
      </div>
    )
  }
}
