import React from 'react';

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: '',
      sort: 'rank'
    };
  }

  handleSearch = (e) => {
    e.preventDefault();
    console.log('handle search');
    this.props.getBooks(this.state.filter,this.state.sort);
  }

  updateFilter = (e) => {
    this.setState({
      filter: e.target.value
    })
  }

  updateSort = (e) => {
    this.setState({
      sort: e.target.value
    })
  }

  render() {
    return (
      <section className="search-form-container">
        <h2>Find NYT best sellers</h2>
        <form className="search-form">
          <label htmlFor="book-filter">filter: </label>
          <input 
            id="book-filter" 
            value={this.state.filter} 
            onChange={(e) => this.updateFilter(e)}>
          </input>
          <br></br>
          <label htmlFor="book-sort">sort: </label>
          <select 
            id="book-sort" 
            value={this.state.sort}
            onChange={(e) => this.updateSort(e)}>
            <option value="rank">rank</option>
            <option value="title">title</option>
          </select>
          <br></br>
          <button onClick={(e) => this.handleSearch(e)}>
            SEARCH
          </button>
        </form>
        <hr></hr>
      </section>
    );
  }
}

export default SearchForm;