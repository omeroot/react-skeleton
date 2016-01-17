import React from 'react';


//var CommentItem = require("./comment-item.jsx");

var CommentItem = React.createClass({
  displayName: "CommentItem",
  render: function () {
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

var CommentList = React.createClass({
  getInitialState: function () {
    return {}
  },
  render: function () {
    var Comments = this.props.data.map(function (comment) {
      return (
        <CommentItem author={comment.author} key={comment.id}>
          {comment.text}
        </CommentItem>)
    });
    return (
      <div className="commentList">
        {Comments}
      </div>
    )
  }
});

console.log("comment list", CommentList);


module.exports = CommentList;