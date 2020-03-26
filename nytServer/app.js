const express = require('express');
const morgan = require('morgan');
const books = require('./books-data');
const utilities = require('./utilities');
const cors = require('cors');

const app = express();
app.use(morgan('dev'));
app.use(cors());

app.get('/', (req, res) => {
  res.send('home');
});

app.get('/books', (req, res) => {
  const {search, sort} = req.query;
  
  //filter books to return by the search parameter, if included
  let booksToReturn;
  if(!search) {
    booksToReturn = books;
  } else {
    booksToReturn = books
      .filter(book => {
        return book.title.includes(search.toUpperCase());
      });
  }

  if(sort && sort !== 'title' && sort !== 'rank') {
    return res
      .status(400)
      .send('if sort parameter has a value, it must be title or rank');
  } else if (sort === 'title') {
    booksToReturn.sort(utilities.compareTitles);
  } else if (sort === 'rank') {
    booksToReturn.sort(utilities.compareRank);
  }

  res.json(booksToReturn);
});

app.listen(8000, () => console.log('server listening on PORT 8000'));