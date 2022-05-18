import { suite, test } from '@testdeck/mocha';
import {expect} from 'chai';
import { mock, instance } from 'ts-mockito';
import { ChainAnalysisUtil } from '../src/chainanalysis-util';


describe('antichainanalysis-util', () =>{

    let utxos = []
    utxos.push({txid: "4a4a48282eb6455816620298211ade45ebcc2900635dcd68c157121677994af2", vout: 0, amountInSats: 30})
    utxos.push({txid: "b06c5dc51b96d69d4b7ecd8cd93531c5902fb0163e66c7a4147dd83efee26fcf", vout: 1, amountInSats: 20})
    utxos.push({txid: "a0faf1399dba2b7c6dfd1d6c010e74e4cac094b1d41c72225db6e2a3bf519998", vout: 0, amountInSats: 50})

    it('should sort utxos with respect to amount', () => {
        let chainAnalysisUtil = new ChainAnalysisUtil();

        let response = []
        response.push({txid: "b06c5dc51b96d69d4b7ecd8cd93531c5902fb0163e66c7a4147dd83efee26fcf", vout: 1, amountInSats: 20})
        response.push({txid: "4a4a48282eb6455816620298211ade45ebcc2900635dcd68c157121677994af2", vout: 0, amountInSats: 30})
        response.push({txid: "a0faf1399dba2b7c6dfd1d6c010e74e4cac094b1d41c72225db6e2a3bf519998", vout: 0, amountInSats: 50})
        expect(chainAnalysisUtil.quickSort(utxos, 0, utxos.length - 1)[0].amountInSats).to.equal(20)
        expect(chainAnalysisUtil.quickSort(utxos, 0, utxos.length - 1)[1].amountInSats).to.equal(30)
        expect(chainAnalysisUtil.quickSort(utxos, 0, utxos.length - 1)[2].amountInSats).to.equal(50)
    })

    it('should return first utxo that has amount equal to 30', () => {
        let chainAnalysisUtil = new ChainAnalysisUtil();

        let sortedUTXOs = chainAnalysisUtil.quickSort(utxos, 0, utxos.length - 1);
        expect(chainAnalysisUtil.binarySearch(sortedUTXOs, 30)).to.eql(utxos[1])
    })

    it('should return 0 if utxo set does not contain target amount 15', () => {
        let chainAnalysisUtil = new ChainAnalysisUtil();

        let sortedUTXOs = chainAnalysisUtil.quickSort(utxos, 0, utxos.length - 1);
        expect(chainAnalysisUtil.binarySearch(sortedUTXOs, 15)).to.eql(0)
    })

    it('should pass if sum of utxos greater than amountInSats', () => {
        let chainAnalysisUtil = new ChainAnalysisUtil();
        let isAmountValid = chainAnalysisUtil.isAmountValid(utxos, 20);
        expect(isAmountValid).to.eql(true)
    })

    it('should pass if sum of utxos lower than amountInSats', () => {
        let chainAnalysisUtil = new ChainAnalysisUtil();

        let isAmountValid = chainAnalysisUtil.isAmountValid(utxos, 101);
        expect(isAmountValid).to.eql(false)
    })

    it('should pass if transaction exist for address (address has been used before on signet)', () => {
        let chainAnalysisUtil = new ChainAnalysisUtil();

        let response = chainAnalysisUtil.getTransactions("tb1p0kvw0qkjtdv0qc02sd4q0xuq4kt0t3phg7xm7zqppljglgpaej0stzkn3s");
        response.then((data) => {
            expect(data.length !== 0).to.equal(true)
        })
    })

    it('should pass if transaction does not exist for address (address has never been used before on signet)', () => {
        let chainAnalysisUtil = new ChainAnalysisUtil();

        let response = chainAnalysisUtil.getTransactions("tb1q30448v2wgrmtjsdemtlw5zdvneq0mjvg4d4m8g");
        response.then((data) => {
            expect(data.length === 0).to.equal(true)
        })

    })
})
