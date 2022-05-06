const createError = require('http-errors');
const express = require('express');

const app = express();
const port = '4000'

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/api/hello', (req, res, next) => {
  res.send("Hello");
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});

app.listen(port, async () => {
  console.log(`Listening on port ${port}`);
});

module.exports = app;
