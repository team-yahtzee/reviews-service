const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
const port = process.env.PORT || 3002;
const { getReviewsFromDatabase, getSearchResultsFromDatabase } = require('../database/helper/helpers.js');

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../public')));

app.get('/:id', (req, res) => {
  getReviewsFromDatabase(req.params.id, (err, data) => {
    if (err) {
      console.error('Error retrieving reviews from database', err)
    } else {
      res.json(data);
    }
  });
});

app.get('/:id/search/:word', (req, res) => {
  getSearchResultsFromDatabase(req.params.id, req.params.word, (err, data) => {
    if (err) {
      console.error('Error retrieving reviews from database', err)
    } else {
      res.json(data);
    }
  });
});


app.post('/', (req, res) => {
  
});












app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});
