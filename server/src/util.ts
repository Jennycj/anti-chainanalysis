import axios from "axios";

async function getUtxoDetails(outputs: { txid: string; vout: number; }[]) {
    let response = []
    let result;
    for(let i=0; i<outputs.length; i++) {
        let txid = outputs[i].txid
        let vout = outputs[i].vout
        let data = `{"jsonrpc": "1.0", "id": "curltest", "method": "gettxout", "params": ["${txid}", ${vout}]}`;

        var config = {
        method: 'post',
        url: 'http://127.0.0.1:19832/',
        headers: { 
            'content-type': 'text/plain;', 
            'Authorization': 'Basic dGVzdDp0ZXN0'
        },
        data : data
        };

        result = await axios(config)
        response.push(result.data.result)
    }
    
    console.log(response)
    return response;
}


const outputs =[
  {txid: "12c02e92762868e95a12ecaf25624aa877c542630a5fbf2cf421f11c3c9dc1dd" ,vout: 1},
  {txid: "9b4616216897e065009ad360d16c8dd6ff27842fe14fe84ad704e4ee377c54c6", vout: 1},
  {txid: "bb58755c0f1eee67f181488097c657a6ae5327785cd014e16731657afbd17da3", vout: 0}
]

console.log(getUtxoDetails(outputs))

export default getUtxoDetails;

