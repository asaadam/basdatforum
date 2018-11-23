import React, { Component } from 'react'
import { Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button } from 'reactstrap';

export default class Ccard extends Component {
  render() {
    return (
        <div>
      <Card>
        <CardBody>
          <CardTitle>{this.props.title}</CardTitle>
          <p>{this.props.post}</p>
          <Button>Button</Button>
        </CardBody>
      </Card>
    </div>
    )
  }
}
