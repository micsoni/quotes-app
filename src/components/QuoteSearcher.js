import React from "react";
import Quote from "./Quote";

export default class QuoteSearcher extends React.Component {
  state = {
    quotes: [],
    fetching: true,
    error: false
  };

  componentDidMount() {
    return fetch("https://quote-garden.herokuapp.com/quotes/search/tree")
      .then(res => res.json())
      .then(data => {
        const quotesData = data.results.map(result => {
          return { ...result, likes: false, dislikes: false, quoteCss: {} };
        });
        this.setState({ quotes: quotesData, fetching: false });
      })
      .catch(error => {
        this.setState({ error: true, quotes: [] });
        console.log(error);
      });
  }

  // method to change css and add like according to ID
  likedIt = id => {
    const updateLikes = this.state.quotes.map(quote => {
      if (quote._id === id) {
        const style = {
          p: { color: "green", fontWeight: "bold" }
        };
        return { ...quote, likes: true, dislikes: false, quoteCss: style.p };
      } else {
        return quote;
      }
    });

    this.setState({ quotes: updateLikes });
  };

  // method to change css and add dislike according to ID
  dislikedIt = id => {
    const updateLikes = this.state.quotes.map(quote => {
      if (quote._id === id) {
        const style = {
          p: { color: "red", textDecoration: "line-through" }
        };
        return { ...quote, dislikes: true, likes: false, quoteCss: style.p };
      } else {
        return quote;
      }
    });
    this.setState({ quotes: updateLikes });
  };

  render() {
    const totalLikes = this.state.quotes.reduce((acc, quote) => {
      if (quote.likes) {
        return acc + 1;
      } else {
        return acc;
      }
    }, 0);

    const totalDislikes = this.state.quotes.reduce((acc, quote) => {
      if (quote.dislikes) {
        return acc + 1;
      } else {
        return acc;
      }
    }, 0);

    const displayQuotes = this.state.quotes.map(quote => (
      <Quote
        key={quote._id}
        text={quote.quoteText}
        author={quote.quoteAuthor}
        changeQuoteCss={quote.quoteCss}
        addLike={() => this.likedIt(quote._id)}
        addDislike={() => this.dislikedIt(quote._id)}
      />
    ));

    if (this.state.fetching === true) {
      return <p>Loading...</p>;
    }

    return (
      <div>
        <h1>Quotes</h1>
        <h2>
          Liked: {totalLikes}/ Dislikes: {totalDislikes}
        </h2>
        <div>{displayQuotes}</div>
      </div>
    );
  }
}
