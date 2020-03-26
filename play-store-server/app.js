const express = require('express');
const morgan = require('morgan');
const playstoreApps = require('./playstore-data');
const cors = require('cors');

const app = express();
app.use(morgan('dev'));
app.use(cors());

app.get('/apps', (req, res) => {
  const {sort, genres} = req.query;
  
  let returnedApps = playstoreApps;
  
  //validation of sort query parameter
  if(sort) {
    if(!['Rating','App'].includes(sort)) {
      return res
        .status(400)
        .send('if included, sort must be either Rating or App');
    }
  }
  //validation of genre query parameter
  if(genres) {
    const validGenres = ['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'];
    if(!validGenres.includes(genres)) {
      return res
        .status(400)
        .send('if included, genres must be one of the following: Action, Puzzle, Strategy, Casual, Arcade, Card')
    }
  }

  //filter by genre
  if(genres) {
    returnedApps = returnedApps
      .filter((app) => app.Genres === genres);
  }

  //sort by rating or app
  if(sort === 'App') {
    //sort apps alphabetically
    returnedApps
      .sort((a, b) => {
        return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
      });
  } else {
    //sort rating from high to low
    returnedApps
      .sort((a, b) => {
        return a[sort] < b[sort] ? 1 : a[sort] > b[sort] ? -1 : 0;
      });
  }
  
  res.json(returnedApps);
});

app.listen(8000, () => console.log('server running on PORT 8000'));