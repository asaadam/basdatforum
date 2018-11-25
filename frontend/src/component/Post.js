import React, { Component } from 'react';
import { Input, Form, FormGroup, Label, Button } from 'reactstrap';

export default class Post extends Component {
  render() {
    return (
      <Form>
          <FormGroup>
            <Label for="exampleText">Text Area</Label>
            <Input type="text" name="text" id="exampleText"/>
            <Input type="textarea" name="text" id="exampleText"/>
            <Button>Button</Button>
        </FormGroup>
      </Form>
    )
  }
}
