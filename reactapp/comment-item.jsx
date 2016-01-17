import React from 'react';



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

console.log('item', CommentItem);

module.export = CommentItem;