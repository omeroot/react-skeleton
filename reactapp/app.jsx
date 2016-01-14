import React from 'react';
import ReactDom from 'react-dom'


var B = require('./b.jsx');
var Form = require('elemental').Form;
var FormField = require('elemental').FormField;
var FormInput = require('elemental').FormInput;
var Checkbox = require('elemental').Checkbox;
var Button = require('elemental').Button;
var Row = require('elemental').Row;
var Col = require('elemental').Col;

var App = React.createClass({
  initialState: function () {
    return {}
  },
  render: function () {
    return (
        <Row id="login">
          <Col sm="1/2">
            <Form>
              <FormField label="Email address" htmlFor="basic-form-input-email">
                <FormInput autofocus type="email" placeholder="Enter emaill" name="basic-form-input-email"/>
              </FormField>
              <FormField label="Password" htmlFor="basic-form-input-password">
                <FormInput type="password" placeholder="Password" name="basic-form-input-password"/>
              </FormField>
              <FormField>
                <Checkbox label="Check it"/>
              </FormField>
              <Button type="default">Submit</Button>
            </Form>
          </Col>
        </Row>
    )
  }
});

ReactDom.render(<App />, document.getElementById('container'));