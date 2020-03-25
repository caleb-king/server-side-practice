const express = require('express');
const morgan = require('morgan');
const utilities = require('./utilities');

const app = express();
app.use(morgan('dev'));

//solution to drill #1
app.get('/sum', (req, res) => {
  const a = parseInt(req.query.a);
  const b = parseInt(req.query.b);
  if(!a) {
    return res.status(400).send('please provide a valid number for parameter a');
  }
  if(!b) {
    return res.status(400).send('please provide a valid number for parameter b');
  }

  const returnString = `The sum of ${a} and ${b} is ${a + b}`;
  res.send(returnString);
});

//solution to drill #2
app.get('/cipher', (req, res) => {
  const inputText = req.query.text;
  const shift =  parseInt(req.query.shift);

  if(!inputText) {
    return res.status(400).send('Please include a message for encrypting within a parameter called text.');
  }
  if(!shift && shift !== 0) {
    return res.status(400).send('Please include a number for your cipher to be shifted within a parameter called shift.');
  }
  if(shift < 1 || shift > 25) {
    return res.status(400).send('Please use a value from 1-25 for your shift.');
  }

  res.send(utilities.encrypt(shift, inputText));
});

//solution to drill #3
app.get('/lotto', (req, res) => {
  const lottoTicketArr = req.query.numbers;
  if ( lottoTicketArr.length !== 6) {
    return res.send('Please include 6 distinct numbers in your numbers array');
  }
  if (!lottoTicketArr.every(utilities.isNumBtwn1And20)) {
    return res.send('Each element in your lotto array must be a number between 1 and 20');
  }
  const winningNumbers = utilities.getRandomLottoNum();
  const numMatches = utilities.calculateHowManyMatches(lottoTicketArr, winningNumbers);
  let responseText = 'Sorry, you lose';
  if (numMatches === 4) responseText = 'Congratulations, you win a free ticket';
  if (numMatches === 5) responseText = 'Congratulations! You win $100!';
  if (numMatches === 6) responseText = 'Wow! Unbelievable! You could have won the mega millions!';
  res.send(responseText);
});

app.listen(8080, () => console.log('server running on port 8080'));