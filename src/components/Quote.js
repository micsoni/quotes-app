import React from "react";
import PropTypes from "prop-types";

export default class Quote extends React.Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    changeQuoteCss: PropTypes.object.isRequired,
    addLike: PropTypes.func.isRequired
  };

  render() {
    return (
      <div>
        <p style={this.props.changeQuoteCss}> {this.props.text}</p>
        <div>
          By: {this.props.author}{" "}
          <button onClick={this.props.addLike}>like</button>{" "}
          <button onClick={this.props.addDislike}>dislike</button>
        </div>
      </div>
    );
  }
}
