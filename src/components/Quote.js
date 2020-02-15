import React from "react";
import PropTypes from "prop-types";

export default class Quote extends React.Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired
  };

  state = {};

  render() {
    return (
      <div>
        <p> {this.props.text}</p>
        <p> By: {this.props.author}</p>
      </div>
    );
  }
}
