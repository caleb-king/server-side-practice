import React from 'react';
import './App.css';
import BooksDisplay from './BooksDisplay';
import SearchForm from './SearchForm';


class App extends React.Component {  
  constructor(props) {
    super(props);
    this.state = {
      books: null
    }
  }

  getBooks = (search, sort) => {
    const baseUrl = 'http://localhost:8000/books';
    const params = search ? `?search=${search}&sort=${sort}` : `?sort=${sort}`;
    const inputToFetch = baseUrl+params;
    console.log(params);
    fetch (inputToFetch, {
      method: 'GET'
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        this.setState({
          books: data
        })
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  render() {
    return (
      <>
        <header className="App">
          <h1>New York Times Best Sellers</h1>
        </header>
        <main>
          <SearchForm
            getBooks={this.getBooks}>
          </SearchForm>
          <BooksDisplay
            books={this.state.books}>
          </BooksDisplay>
        </main>
      </>
    );
  }
}

export default App;