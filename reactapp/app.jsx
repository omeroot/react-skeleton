import React from 'react';
import ReactDom from 'react-dom'

var $ = require('../bower_components/jquery/dist/jquery.js');

var CommentList = require('./comment-list.jsx');
var CommentForm = require('./comment-form.jsx');

var data = [
  {id: 1, author: "Pete Hunt", text: "This is one comment"},
  {id: 2, author: "Jordan Walke", text: "This is *another* comment"}
];

var CommentItem = React.createClass({
  displayName: "CommentItem",
  render: function(){
    return (
      <div className="comment">
        <h2 className="commentAuthor">
          { this.props.author }
        </h2>
        { this.props.children }
      </div>
    );
  }
});

var App = React.createClass({
  displayName: "CommentBox",
  getInitialState: function () {
    return {
      data:[]
    }
  },
  componentDidMount: function(){
    console.log(">>>>");
    $.ajax({
      url: "http://localhost:3000/comments",
      dataTyp: "json",
      type: "GET",
      success: function(response){
        this.setState({data: response});
      }.bind(this),
      error: function(xhr, status, err){
        console.log(status, err.toString());
      }.bind(this)
    })
  },
  render: function () {
    console.log("<<<");
    return (
      <div className="commentBox">
        <h1>COMMENTS</h1>
        <CommentList data={this.state.data}/>
        <CommentForm />
      </div>
    )
  }
});

ReactDom.render(<App />, document.getElementById('container'));