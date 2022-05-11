import express from 'express';
import httpErrors from 'http-errors';
import chainAnalysisService, {UTXO, UtxoRequest} from "./chainanalysis-service";
import chainAnalysisUtil from "./chainanalysis-util";


// Configure server
const app = express();
const port = '4000'

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post('/api/uxto', (req, res, next) => {

  const { amountInSats, utxos } = req.body
  // console.log("=============1 ", amountInSats)
  // console.log("=============2 ", utxos)

  const outputs : UtxoRequest[] =[
    {txid: "ac3da281c872a026c1a8587a92dbe7c2012a5d5317d7fe6ae57933a260f0d09f" ,vout: 0},
    {txid: "bd8c0a7dff4499842c0af50ba2beb1881e48a6261b6fabdec132a8f44a367ea7", vout: 0},
    {txid: "bd388f32e3feb86ff59c87fae4a27d30ec3105bcb11a62ff1a38b6820c3ba0a8", vout: 0}
  ]

  let utxoDetails = chainAnalysisUtil.getUtxoDetails(outputs);
  utxoDetails.then((utxoDetailsResponse) => {
    let sortedUTXOs = chainAnalysisUtil.quickSort(utxoDetailsResponse, 0, utxos.length - 1);
    let bestUTXOCombination = chainAnalysisService.getBestUTXOCombination(sortedUTXOs, parseInt(amountInSats));
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