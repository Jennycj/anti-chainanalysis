import axios from "axios";
//
// async function getUtxoDetails(outputs: { txid: string; vout: number; }[]) {
//     let response = []
//     let result;
//     for(let i=0; i<outputs.length; i++) {
//         let txid = outputs[i].txid
//         let vout = outputs[i].vout
//         let data = `{"jsonrpc": "1.0", "id": "curltest", "method": "gettxout", "params": ["${txid}", ${vout}]}`;
//
//         var config = {
//         method: 'post',
//         url: 'http://127.0.0.1:18443',
//         headers: {
//             'content-type': 'text/plain;',
//             'Authorization': 'Basic cG9sYXJ1c2VyOnBvbGFycGFzcw=='
//         },
//         data : data
//         };
//
//         result = await axios(config)
//         response.push(result.data.result)
//     }
//
//     console.log(response)
//     return response;
// }
//
//
// const outputs =[
//   {txid: "ac3da281c872a026c1a8587a92dbe7c2012a5d5317d7fe6ae57933a260f0d09f" ,vout: 0},
//   {txid: "bd8c0a7dff4499842c0af50ba2beb1881e48a6261b6fabdec132a8f44a367ea7", vout: 0},
//   {txid: "bb58755c0f1eee67f181488097c657a6ae5327785cd014e16731657afbd17da3", vout: 0}
// ]
//
// console.log(getUtxoDetails(outputs))

// export default getUtxoDetails;

