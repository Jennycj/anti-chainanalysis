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

    async getTransactionDetailsFromBlockStream(transactionId: string): Promise<any> {
        return await axios.get('https://blockstream.info/testnet/api/tx/' + transactionId)
            .then(paymentresponse => {
                return paymentresponse
            }).catch((err) => {
                console.log("-----------", err)
            });
    }

    getBestUTXOCombination(utxos: UTXO[], amount: number): any {
        let paymentUTXOs: UTXO[] = [];
        let singlePaymentUTXOs: UTXO[] = [];
        let accumulateAmount = 0;

        let foundUTXO = chainAnalysisUtil.binarySearch(utxos, amount);
        if (foundUTXO !== 0) {
            return foundUTXO;
        }
        for (let i = 0; i < utxos.length; i++) {
            let amountDiff = utxos[i].amountInSats - amount
            let biggerChange = (amount * 2) + 1
            if (amountDiff > amount) {
                paymentUTXOs.push(utxos[i])
                return paymentUTXOs
            } else if (utxos[i].amountInSats >= biggerChange) {
                paymentUTXOs.push(utxos[i])
                return paymentUTXOs
            } else {
                accumulateAmount += utxos[i].amountInSats;
                if (accumulateAmount <= amount) {
                    paymentUTXOs.push(utxos[i])
                } else if (accumulateAmount >= biggerChange) {
                    paymentUTXOs.push(utxos[i])
                    return paymentUTXOs
                } else {
                    paymentUTXOs.push(utxos[i])
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
