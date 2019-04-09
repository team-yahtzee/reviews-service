const express = require('express');
const morgan = require('morgan');
const path = require('path');
const util = require('util');
const app = express();
const port = process.env.PORT || 3002;
const { getReviewsFromDatabase, getSearchResultsFromDatabase } = require('../database/helper/helpers.js');

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../public')));

function getPaginatedItems(items, offset) {
  return items.slice(offset, offset + 7);
}

// app.get('/:id', (req, res) => {
//   getReviewsFromDatabase(req.params.id, (err, data) => {
//     if (err) {
//       console.error('Error retrieving reviews from database', err)
//     } else {
//       res.json(data);
//     }
//   });
// });

app.get('/:id/search/:word', (req, res) => {
  getSearchResultsFromDatabase(req.params.id, req.params.word, (err, data) => {
    if (err) {
      console.error('Error retrieving reviews from database', err)
    } else {
      res.json(data);
    }
  });
});

app.get('/:id', (req, res) => {
  getReviewsFromDatabase(req.params.id, (err, data) => {
    if (err) {
      console.error('Error retrieving reviews from database', err);
    } else {
      let items = data;
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
      return res.json(json);
      // return res.json(data);
    }
  });
});

app.post('/', (req, res) => {
  
});












app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});
