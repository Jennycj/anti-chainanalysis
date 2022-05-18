import axios from "axios";
import {UTXO} from "./chainanalysis-service";


export class ChainAnalysisUtil {


    partition(array: Array<UTXO>, left: number = 0, right: number = array.length - 1) {
        const pivot = array[Math.floor((right + left) / 2)].amountInSats;
        let i = left;
        let j = right;

        while (i <= j) {
            while (array[i].amountInSats < pivot) {
                i++;
            }

            while (array[j].amountInSats > pivot) {
                j--;
            }

            if (i <= j) {
                [array[i], array[j]] = [array[j], array[i]];
                i++;
                j--;
            }
        }

        return i;
    }

    quickSort(array: Array<UTXO>, left: number = 0, right: number = array.length - 1) {
        let index;

        if (array.length > 1) {
            index = this.partition(array, left, right);

            if (left < index - 1) {
                this.quickSort(array, left, index - 1);
            }

            if (index < right) {
                this.quickSort(array, index, right);
            }
        }

        return array;
    }

    binarySearch(utxos: UTXO[], target: number): UTXO | number {
        let left: number = 0;
        let right: number = utxos.length - 1;

        while (left <= right) {
            const mid: number = Math.floor((left + right) / 2);

            if (utxos[mid].amountInSats === target) return utxos[mid];
            if (target < utxos[mid].amountInSats) right = mid - 1;
            else left = mid + 1;
        }
        return 0;
    }

    async getUtxoDetails(outputs: { txid: string; vout: number; }[]): Promise<any> {
        let response = []
        let result;
        for (let i = 0; i < outputs.length; i++) {
            let txidd = outputs[i].txid
            let voutt = outputs[i].vout
            let data = `{"jsonrpc": "1.0", "id": "curltest", "method": "gettxout", "params": ["${txidd}", ${voutt}]}`;

            var config = {
                method: 'post',
                url: 'http://127.0.0.1:18443',
                headers: {
                    'content-type': 'text/plain;',
                    'Authorization': 'Basic dGVzdDp0ZXN0'
                },
                data: data
            };

            result = await axios(config)
            // response.push(result.data.result)
            // console.log("#===========# ", result.data.result.scriptPubKey.addresses)
            console.log("#===========# ", result.data.result)
            response.push({txid: txidd, vout: voutt, amountInSats: result.data.result.value})
        }

        console.log(response)
        return response;
    }

    async getTransactions(address: string): Promise<any> {
        return await axios.get('https://mempool.space/signet/api/address/' + address + '/txs')
            .then(addressresponse => {
                return addressresponse.data
            }).catch((err) => {
                console.log("-----------", err)
            });
    }

    isAmountValid(utxos: any, amountInSats: number): boolean {
        let sum: number = utxos.map((a: { amountInSats: any; }) => a.amountInSats).reduce(function (a: any, b: any) {
            let number = a + b;
            return number;
        });
        return sum>=amountInSats;
    }
}


let chainAnalysisUtil = new ChainAnalysisUtil();
export default chainAnalysisUtil;
