const express = require('express');
const morgan = require('morgan');
const path = require('path');
const util = require('util');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3002;
const { sortReviews, getPaginatedItems } = require('./helpers.js');
// const { getReviewsFromDatabase, getSearchResultsFromDatabase } = require('../database/helper/helpers.js');
const { getReviewsFromDatabase, getSearchResultsFromDatabase } = require('../database-mysql/models/model.js');

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../public')));
app.use(cors());

app.get('/:id', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'))
})

app.get('/room/:id', (req, res) => {
  getReviewsFromDatabase(req.params.id, (err, data) => {
    if (err) {
      console.error('Error retrieving all reviews from database', err);
    } else {
      let items = sortReviews(data);
      let offset = req.query.offset ? parseInt(req.query.offset) : 0;
      let nextOffset = offset + 7;
      let previousOffset = offset - 7 < 1 ? 0 : offset - 7;
      let meta = {
        limit: 7,
        next: util.format('?limit=%s&offset=%s', 7, nextOffset),
        offset: req.query.offset,
        previous: util.format('?limit=%s&offset=%s', 7, previousOffset),
        total_count: items.length,
      };
      let json = {
        meta: meta,
        comments: getPaginatedItems(items, offset),
        data: data
      };
      return res.send(json);
    }
  });
});

app.get('/:id/search/:word', (req, res) => {
  getSearchResultsFromDatabase(req.params.id, req.params.word, (err, data) => {
    if (err) {
      console.error('Error retrieving searched reviews from database', err);
    } else {
      res.send(sortReviews(data));
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
