import axios from "axios";


export interface UTXO {
    transactionId: string;
    amountInSats: number;
}

export class ChainAnalysisService {

    async getTransactionDetailsFromBlockStream(transactionId: string) : Promise<any> {
        return await axios.get('https://blockstream.info/testnet/api/tx/'+ transactionId)
            .then(paymentresponse => {
                return paymentresponse
            }).catch((err) => {
                console.log("-----------", err)
            });
    }

    getBestUTXOCombination(utxos: UTXO[]): any{

    }

}

let chainAnalysisService = new ChainAnalysisService();
export default chainAnalysisService;
