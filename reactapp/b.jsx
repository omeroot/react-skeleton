import React from "react";

var B = React.createClass({
  initialState: function(){

  },
  render: function(){
    return (
      <p>{this.props.myname}</p>
    );
  }
});

module.exports = B;