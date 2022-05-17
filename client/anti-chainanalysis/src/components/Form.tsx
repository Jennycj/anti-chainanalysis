import React, {ChangeEvent, useState} from "react";
import './Form.css'
import axios from "axios";

function Form() {
    interface UtxoProps {
        txid?: string;
        vout?: string;
        index?: string;
    }

    interface InfoProps {
        address: string;
        amount: string;
    }

    const [inputList, setInputList] = useState<Array<UtxoProps>>([{txid: "", vout: ""}]);
    const [amountList, setAmountList] = useState<InfoProps>({amount: "", address: ""});


    const onChangeTxidHandler = (e: ChangeEvent<HTMLInputElement>, i: number, param: string) => {
        setInputList((prev) => {
                let newInputList: any = [...prev]
                if (param === "txid") {
                    let newInput = {...newInputList[i], txid: e.target.value}
                    newInputList[i] = newInput
                    return newInputList;
                }
                if (param === "vout") {
                    let newInput = {...newInputList[i], vout: e.target.value}
                    newInputList[i] = newInput
                    return newInputList;
                }

            }
        )
    }

    const onChangeAmountHandler = (e: ChangeEvent<HTMLInputElement>, param: string) => {
        setAmountList((prev: any) => {
                if (param === "amount") {
                    let newInput = {...prev, amount: e.target.value}
                    return newInput;
                }
                if (param === "address") {
                    let newInput = {...prev, address: e.target.value}
                    return newInput;
                }

            }
        )
    }

    // handle click event of the Remove button
    const handleRemoveClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, index: number) => {
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
    };

    // handle click event of the Add button
    const handleAddClick = () => {
        setInputList(() => [...inputList, {txid: "", vout: ""}]);

    };

    const callAnalyzeAPI = (destinationAddress: string, amountInSats: string, outputs: { txid: string; vout: number; }[]) => {
        console.log("=====got here =======")
        axios.post('http://localhost:4000/api/utxo/analyze', {
            destinationAddress: destinationAddress,
            amountInSats: amountInSats,
            utxos: outputs
        }).then(response => {
            console.log("[+]", response.data);
        }).catch((err) => {
            console.log(err)
        });

    }

    const handleSubmitClick = () => {
        const data = [inputList, amountList]
        console.log(">>>>>>>>>>> ", data);
        const input = [
            {txid: "4a4a48282eb6455816620298211ade45ebcc2900635dcd68c157121677994af2", vout: 0},
            {txid: "b06c5dc51b96d69d4b7ecd8cd93531c5902fb0163e66c7a4147dd83efee26fcf", vout: 1},
            {txid: "a0faf1399dba2b7c6dfd1d6c010e74e4cac094b1d41c72225db6e2a3bf519998", vout: 0}
        ]
        callAnalyzeAPI("tb1q30448v2wgrmtjsdemtlw5zdvneq0mjvg4d4m8g", "10.0009", input)

        return data;
    }


    return (
        <div className="form">
            <h3 className='form-header'>Best UTXO combinator</h3>
            <div className="wrapper">
                <div className="box">
                    <input
                        name="amount"
                        placeholder="Amount"
                        onChange={(e) => onChangeAmountHandler(e, "amount")}
                    />
                    <input
                        name="address"
                        placeholder="Destination address"
                        onChange={(e) => onChangeAmountHandler(e, "address")}
                    />
                </div>
                {inputList.map((x: UtxoProps, i: number) => {
                    return (
                        <div className="box" key={i}>
                            <input
                                name="transactionID"
                                placeholder="Enter transaction ID here"
                                onChange={(e) => onChangeTxidHandler(e, i, "txid")}
                            />
                            <input
                                className="ml10"
                                name="Index"
                                placeholder="Enter vout here"
                                onChange={(e) => onChangeTxidHandler(e, i, "vout")}
                            />
                            <div className="btn-box">
                                {inputList.length !== 1 && <button
                                    className="mr10"
                                    onClick={(e) => handleRemoveClick(e, i)}>Remove</button>}
                                {/* {inputList.length - 1 === i && <button onClick={handleAddClick}>Add</button>} */}
                            </div>
                        </div>
                    );
                })}

            </div>
            <div className='btn-wrapper'>
                <button onClick={handleAddClick}>Add</button>
                <button onClick={handleSubmitClick}>Submit</button>
            </div>

            {/* <div style={{ marginTop: 20 }}>{JSON.stringify(inputList)}</div> */}
        </div>
    );
}

export default Form;