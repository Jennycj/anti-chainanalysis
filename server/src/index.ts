import express from 'express';
import httpErrors from 'http-errors';
import chainAnalysisService, {UTXO} from "./chainanalysis-service";
import chainAnalysisUtil from "./chainanalysis-util";


// Configure server
const app = express();
const port = '4000'

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/api/hello', (req, res, next) => {

  const { amountInSats, utxos } = req.body
  console.log("=============1 ", amountInSats)
  console.log("=============2 ", utxos)

  let transactionDetailsFromBlockStream = chainAnalysisService.getTransactionDetailsFromBlockStream("13417e07a48220a3a645020ea502b257ca74041f5e5ff6f53989ff7dac00007c");
  transactionDetailsFromBlockStream.then((response) => {
    // //sort the utxos
    // let newUTXOs: UTXO[] = [
    //   {transactionId: "43417e07a48220a3a645020ea502b257ca74041f5e5ff6f53989ff7dac00007c", amountInSats: 11},
    //   {transactionId: "13417e07a48220a3a645020ea502b257ca74041f5e5ff6f53989ff7dac00007c", amountInSats: 2},
    //   {transactionId: "33417e07a48220a3a645020ea502b257ca74041f5e5ff6f53989ff7dac00007c", amountInSats: 5},
    //   {transactionId: "23417e07a48220a3a645020ea502b257ca74041f5e5ff6f53989ff7dac00007c", amountInSats: 3}
    // ];

    let sortedUTXOs = chainAnalysisUtil.quickSort(utxos, 0, utxos.length - 1);
    // for (let i = 0; i < utxos.length; i++) {
    //   console.log(utxos[i]);
    // }

    let bestUTXOCombination = chainAnalysisService.getBestUTXOCombination(sortedUTXOs, amountInSats);
    res.json({data: bestUTXOCombination});
    // res.json({data: response.data});
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