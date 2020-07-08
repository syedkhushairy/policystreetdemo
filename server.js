const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const api = require('./app/routes/index').router;

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get('/:id', (req, res) => {
  res.json({ message: 'You have reach to the unexpected place' });
});

//get all routes
app.use('/api/v1', api);

// set port, listen for requests
app.listen(3500, () => {
  console.log('Server is running on port 3500.');
});
