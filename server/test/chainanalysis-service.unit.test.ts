import { suite, test } from "@testdeck/mocha";
import { expect } from "chai";
import { mock, instance } from "ts-mockito";
import { ChainAnalysisService } from "../src/chainanalysis-service";

describe("antichainanalysis-service", () => {
  let utxos = [];
  utxos.push({
    txid: "4a4a48282eb6455816620298211ade45ebcc2900635dcd68c157121677994af2",
    vout: 0,
    amountInSats: 30,
  });
  utxos.push({
    txid: "b06c5dc51b96d69d4b7ecd8cd93531c5902fb0163e66c7a4147dd83efee26fcf",
    vout: 1,
    amountInSats: 20,
  });
  utxos.push({
    txid: "a0faf1399dba2b7c6dfd1d6c010e74e4cac094b1d41c72225db6e2a3bf519998",
    vout: 0,
    amountInSats: 50,
  });

  it("should pass if utxos with the exact amount to send", () => {
    let chainAnalysisService = new ChainAnalysisService();

    let response = [];
    response.push({
      txid: "b06c5dc51b96d69d4b7ecd8cd93531c5902fb0163e66c7a4147dd83efee26fcf",
      vout: 1,
      amountInSats: 20,
    });
    response.push({
      txid: "4a4a48282eb6455816620298211ade45ebcc2900635dcd68c157121677994af2",
      vout: 0,
      amountInSats: 30,
    });
    response.push({
      txid: "a0faf1399dba2b7c6dfd1d6c010e74e4cac094b1d41c72225db6e2a3bf519998",
      vout: 0,
      amountInSats: 50,
    });
    expect(
      chainAnalysisService.getBestUTXOCombination(utxos, 20).amountInSats
    ).to.eql(20);
  });

  it("should pass if utxos set can cater for change greater than amount to send", () => {
    let chainAnalysisService = new ChainAnalysisService();

    let response = [
      {
        txid: "4a4a48282eb6455816620298211ade45ebcc2900635dcd68c157121677994af2",
        vout: 0,
        amountInSats: 30,
      },
      {
        txid: "b06c5dc51b96d69d4b7ecd8cd93531c5902fb0163e66c7a4147dd83efee26fcf",
        vout: 1,
        amountInSats: 20,
      },
    ];
    expect(chainAnalysisService.getBestUTXOCombination(utxos, 15)).to.eql(
      response
    );
  });
});
