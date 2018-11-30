import React, { Component } from 'react'
import Cardd from '../component/Cardd';
import Post from '../component/Post';
import { Container, Row, Col } from 'reactstrap';

export default class Home extends Component {
  render() {
    return (
        <Container>
        {localStorage.token && 
        <Post>
        </Post>}
        {localStorage.token && 
        <Cardd>
        </Cardd>}
        </Container>
    )
  }
}
