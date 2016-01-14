import React from 'react';
import ReactDom from 'react-dom'


var B = require('./b.jsx');
var Form = require('elemental').Form;
var FormField = require('elemental').FormField;
var FormInput = require('elemental').FormInput;
var Checkbox = require('elemental').Checkbox;
var Button = require('elemental').Button;

var App = React.createClass({
  initialState: function(){
    return {

    }
  },
  render: function(){
    return (
        <Form>
          <FormField label="Email address" htmlFor="basic-form-input-email">
            <FormInput autofocus type="email" placeholder="Enter emaill" name="basic-form-input-email" />
          </FormField>
          <FormField label="Password" htmlFor="basic-form-input-password">
            <FormInput type="password" placeholder="Password" name="basic-form-input-password" />
          </FormField>
          <FormField>
            <Checkbox label="Check it" />
          </FormField>
          <Button type="default">Submit</Button>
        </Form>
    )
  }
});

ReactDom.render(<App />, document.getElementById('container'));