import React, { Component } from 'react'
import { Card, CardImg, CardText, CardBody, CardLink,
  CardTitle, CardSubtitle,Button } from 'reactstrap';
  var jwt  = require('jsonwebtoken');
let username = jwt.decode(localStorage.token);

  
export default class Ccard extends Component {
 
  delete = (idThread) =>{
    console.log(idThread);
    const URL_Delte = 'http://localhost:5000/api/deleteThread';
    const body={
      idThread : idThread
    }
    fetch(URL_Delte,{
      method: 'DELETE',
      headers:{
        'content-type':'application/json',
        'authorization': localStorage.token
      },
      body: JSON.stringify(body)
    }).then(res=>{
      window.location.reload();
    }).catch(err=>{
       console.log("gagal delete");
    })
    // window.location.reload();
  }

  render() {
    console.log(this.props)
    return (
      <div>
      <Card>
        <CardBody>
          <CardTitle>{this.props.title}</CardTitle>
          <CardSubtitle>{this.props.username}</CardSubtitle>
        {/* </CardBody>
        <img width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
        <CardBody> */}
          <CardText>{this.props.post}</CardText>
          
          <CardLink href={'/detail?'+this.props.idThread}><Button>Comment</Button></CardLink>
          {(this.props.idUser == username._id) && <Button onClick={() => this.delete(this.props.idThread)}>Delete Thread</Button>}
            
        </CardBody>
      </Card>
    </div>
    )
  }
}
