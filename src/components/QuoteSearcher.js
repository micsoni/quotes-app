import React from "react";
import PropTypes from "prop-types";
import Quote from "./Quote";

export default class QuoteSearcher extends React.Component {
  static propTypes = {};

  state = {
    quotes: [],
    fetching: true,
    error: false
  };

  componentDidMount() {
    return fetch("https://quote-garden.herokuapp.com/quotes/search/tree")
      .then(res => res.json())
      .then(data => {
        const quotesData = data.results;
        this.setState({ quotes: quotesData, fetching: false });
      })
      .catch(error => {
        this.setState({ error: true, quotes: [] });
        console.log(error);
      });
  }

  render() {
    const displayQuotes = this.state.quotes.map(quote => (
      <Quote
        key={quote._id}
        text={quote.quoteText}
        author={quote.quoteAuthor}
      />
    ));

    if (this.state.fetching === true) {
      return <p>Loading...</p>;
    }

    return (
      <div>
        <h1>Quotes</h1>
        <div>{displayQuotes}</div>
      </div>
    );
  }
}
