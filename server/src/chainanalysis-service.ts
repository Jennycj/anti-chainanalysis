import axios from "axios";
import chainAnalysisUtil from "./chainanalysis-util";

export interface UTXO {
  txid: string;
  amountInSats: number;
  vout: number;
}

export interface UtxoRequest {
  txid: string;
  vout: number;
}

export class ChainAnalysisService {
  async getTransactionDetailsFromBlockStream(
    transactionId: string
  ): Promise<any> {
    try {
      const result = await axios.get(
        "https://blockstream.info/testnet/api/tx/" + transactionId
      );
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  getBestUTXOCombination(utxos: UTXO[], amount: number): any {
    let paymentUTXOs: UTXO[] = [];
    let singlePaymentUTXOs: UTXO[] = [];
    let accumulateAmount = 0;

    let foundUTXO = chainAnalysisUtil.binarySearch(utxos, amount);
    if (foundUTXO !== 0) {
      paymentUTXOs.push(<UTXO>foundUTXO);
      return paymentUTXOs;
    }
    for (let i = 0; i < utxos.length; i++) {
      let amountDiff = utxos[i].amountInSats - amount;
      let biggerChange = amount * 2 + 1;
      if (amountDiff > amount) {
        paymentUTXOs.push(utxos[i]);
        return paymentUTXOs;
      } else if (utxos[i].amountInSats >= biggerChange) {
        paymentUTXOs.push(utxos[i]);
        return paymentUTXOs;
      } else {
        accumulateAmount += utxos[i].amountInSats;
        if (accumulateAmount <= amount) {
          paymentUTXOs.push(utxos[i]);
        } else if (accumulateAmount >= biggerChange) {
          paymentUTXOs.push(utxos[i]);
          return paymentUTXOs;
        } else {
          paymentUTXOs.push(utxos[i]);
        }
      }
    }
    return paymentUTXOs;
  }

  getFeeRateInSataPerByte(): string {
    return "10";
  }
}

let chainAnalysisService = new ChainAnalysisService();
export default chainAnalysisService;
