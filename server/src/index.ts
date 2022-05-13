import express from 'express';
import httpErrors from 'http-errors';
import chainAnalysisService, {UTXO, UtxoRequest} from "./chainanalysis-service";
import chainAnalysisUtil from "./chainanalysis-util";


// Configure server
const app = express();
const port = '4000'

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post('/api/utxo/analyze', (req, res, next) => {

  const { destinationAddress, amountInSats, utxos } = req.body

  let responseStatus = "01";
  let responseMessage = "Failed"

  try{

    let addressTransactionsResponse = chainAnalysisUtil.getAddressTransactions(destinationAddress);
    addressTransactionsResponse.then((addressTransactions) => {
      if(addressTransactions.length === 0){
        responseStatus = "00";
        responseMessage = "Successful"
      }else {
        responseStatus = "03";
        responseMessage = "Destination Address [ "+destinationAddress+" ] may have been used in previous trnasaction"
      }
      let utxoDetails = chainAnalysisUtil.getUtxoDetails(utxos);
      utxoDetails.then((utxoDetailsResponse) => {
        if(chainAnalysisUtil.isAmountValid(utxoDetailsResponse, parseFloat(amountInSats))){
          let sortedUTXOs = chainAnalysisUtil.quickSort(utxoDetailsResponse, 0, utxos.length - 1);
          let bestUTXOCombination = chainAnalysisService.getBestUTXOCombination(sortedUTXOs, parseFloat(amountInSats));
          res.json({status: responseStatus, message: responseMessage, data: bestUTXOCombination});
        } else {
          res.json({status: "01", message: "Amount cannot be greater than or equals sum of UTXOs value", data: null});
        }
      }).catch((err) => {
        res.json({status: responseStatus, message: responseMessage, data: err});
      })
  }).catch((err) => {
      res.json({status: responseStatus, message: responseMessage, data: err});
    })
  } catch (error: any){
    res.json({status: responseStatus, message: error.message, data: null});
  }
});

app.listen(port,  () => {
  console.log(`Listening on port ${port}`);
});