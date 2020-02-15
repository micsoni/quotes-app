import React from "react";
import PropTypes from "prop-types";

export default class Quote extends React.Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired
  };

  state = {
    css: {}
  };

  likedIt = () => {
    const style = {
      p: { color: "green", fontWeight: "bold" }
    };

    this.setState({ css: style.p });
  };

  dislikedIt = () => {
    const style = {
      p: { color: "red", textDecoration: "line-through" }
    };
    this.setState({ css: style.p });
  };

  render() {
    return (
      <div>
        <p style={this.state.css}> {this.props.text}</p>
        <div>
          By: {this.props.author} <button onClick={this.likedIt}>like</button>{" "}
          <button onClick={this.dislikedIt}>dislike</button>
        </div>
      </div>
    );
  }
}
