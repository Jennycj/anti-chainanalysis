import express from 'express';
import chainAnalysisService, {UTXO, UtxoRequest} from "./chainanalysis-service";
import chainAnalysisUtil from "./chainanalysis-util";
import cors from "cors";



const app = express();
const port = '4000'

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: '*' }));

app.post('/api/utxo/analyze', (req, res, next) => {

  const { destinationAddress, amount, utxos } = req.body

  let responseStatus = "01";
  let responseMessage = "Failed"
  let amountInSats = parseFloat(amount)

  try{

    let addressTransactionsResponse = chainAnalysisUtil.getTransactions(destinationAddress);
    addressTransactionsResponse.then((addressTransactions) => {
      if(addressTransactions.length === 0){
        responseStatus = "00";
        responseMessage = "Successful"
      }else {
        responseStatus = "03";
        responseMessage = "Destination Address [ "+destinationAddress+" ] may have been used in a previous transaction"
      }
      let utxoDetails = chainAnalysisUtil.getUtxoDetails(utxos);
      utxoDetails.then((utxoDetailsResponse) => {
        if(chainAnalysisUtil.isAmountValid(utxoDetailsResponse, amountInSats)){
          let sortedUTXOs = chainAnalysisUtil.quickSort(utxoDetailsResponse, 0, utxos.length - 1);
          let bestUTXOCombination = chainAnalysisService.getBestUTXOCombination(sortedUTXOs, amountInSats);
          res.json({status: responseStatus, message: responseMessage, data: bestUTXOCombination});
        } else {
          res.json({status: "01", message: "Amount cannot be greater than or equals sum of UTXOs value", data: null});
        }
      }).catch((err) => {
        responseStatus = "01";
        responseMessage = "An error occurred"
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