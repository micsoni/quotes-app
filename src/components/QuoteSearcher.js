import React from "react";
import Quote from "./Quote";

export default class QuoteSearcher extends React.Component {
  state = {
    quotes: [],
    fetching: false,
    error: false,
    keyWord: " ",
    noQuotes: false
  };

  search = () => {
    this.setState({ fetching: true });
    return fetch(
      `https://quote-garden.herokuapp.com/quotes/search/${this.state.keyWord}`
    )
      .then(res => res.json())
      .then(data => {
        const quotesData = data.results.map(result => {
          return { ...result, likes: false, dislikes: false, quoteCss: {} };
        });
        if (quotesData.length === 0) {
          this.setState({ noQuotes: true, fetching: false });
        } else {
          this.setState({
            quotes: quotesData,
            noQuotes: false,
            fetching: false
          });
        }
      })
      .catch(error => {
        this.setState({ error: true, quotes: [] });
        console.log(error);
      });
  };

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

  //set the input value to the state
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    //add the total of likes
    const totalLikes = this.state.quotes.reduce((acc, quote) => {
      if (quote.likes) {
        return acc + 1;
      } else {
        return acc;
      }
    }, 0);

    // add the total of deslikes
    const totalDislikes = this.state.quotes.reduce((acc, quote) => {
      if (quote.dislikes) {
        return acc + 1;
      } else {
        return acc;
      }
    }, 0);

    //filter duplicate quotes
    const filteredQuotes = this.state.quotes.filter(
      (quote, index, self) =>
        index === self.findIndex(quoteT => quoteT.quoteText === quote.quoteText)
    );

    // display quotes on screen
    let displayQuotes = filteredQuotes.map(quote => (
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
    if (this.state.noQuotes === true) {
      displayQuotes = "No quotes found in your search. Try a different word!";
    }
    return (
      <div>
        <h1>Quotes</h1>
        <input
          type="text"
          name="keyWord"
          onChange={this.handleChange}
          value={this.state.keyWord}
        />
        <button onClick={this.search}>Search!</button>
        <h2>
          Liked: {totalLikes}/ Dislikes: {totalDislikes}
        </h2>
        <div>{displayQuotes}</div>
      </div>
    );
  }
}
