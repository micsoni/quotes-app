import React from "react";
import PropTypes from "prop-types";

export default class AddQuote extends React.Component {
  static propTypes = {
    addNewQuote: PropTypes.func.isRequired
  };
  state = {
    newQuote: " ",
    newAuthor: " "
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.addNewQuote(this.state.newAuthor, this.state.newQuote);
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    return (
      <div className="add-player">
        <h3>Add your own quote</h3>
        <form onSubmit={this.handleSubmit}>
          <label>
            Quote:{" "}
            <input
              type="text"
              name="newQuote"
              onChange={this.handleChange}
              value={this.state.newQuote}
            />
          </label>
          {"  "}
          <label>
            Name:{"  "}
            <input
              type="text"
              name="newAuthor"
              onChange={this.handleChange}
              value={this.state.newAuthor}
            />
          </label>
          <input type="submit" value="Add!" />
        </form>
      </div>
    );
  }
}
