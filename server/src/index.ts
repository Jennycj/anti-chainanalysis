import express from 'express';
import httpErrors from 'http-errors';
import chainAnalysisService from "./chainanalysis-service";


// Configure server
const app = express();
const port = '4000'

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/api/hello', (req, res, next) => {
  let transactionDetailsFromBlockStream = chainAnalysisService.getTransactionDetailsFromBlockStream("13417e07a48220a3a645020ea502b257ca74041f5e5ff6f53989ff7dac00007c");
  transactionDetailsFromBlockStream.then((response) => {
    console.log("==> ", response.data)
    res.json({data: response.data});
  }).catch((err) => {
    res.json({data: err});
  })
});

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(httpErrors.createError(404));
// });
//
// // error handler
// app.use(function (err, req, res, next) {
//   console.error(err.message);
//   if (!err.statusCode) err.statusCode = 500;
//   res.status(err.statusCode).send(err.message);
// });

app.listen(port,  () => {
  console.log(`Listening on port ${port}`);
});