import React, {ChangeEvent, useState} from "react";
import './Form.css'
import axios from "axios";
import {v4 as uuidv4} from 'uuid'


interface UtxoProps {
    id: string;
    txid: string;
    vout: string;
    index?: number;
}

interface InfoProps {
    address: string;
    amount: string;
}
function Form() {

    const [inputList, setInputList] = useState<Array<UtxoProps>>([]);
    const [amountList, setAmountList] = useState<InfoProps>({ amount: "", address: "" });
    const [utxoDetails, setUtxoDetails] = useState('');
    const [showRemove, setShowRemove] = useState(false);
    const [removeMessage, setRemoveMessage] = useState('');
    const [seperator, setSeperator] = useState('');

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
    const handleRemoveClick = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>, id: string) => {
        // if(window.confirm('Are you sure you want to delete?')){
            setInputList(inputList.filter((item) => item.id !== id))
        // }
    };

    // handle click event of the Add button
    const handleAddClick = () => {
        // setInputList( [...inputList, { txid: "", vout: "" }]);
        setUtxoDetails("HEy")
        
    };

    const callAnalyzeAPI = (destinationAddress: string, amount: string, outputs: { txid: string; vout: string; }[]) => {
        console.log("=====got here =======")
        axios.post('http://localhost:4000/api/utxo/analyze', {
            destinationAddress: destinationAddress,
            amount: amount,
            utxos: outputs
        }).then(response => {
            console.log("[+]", response.data);
        }).catch((err) => {
            console.log(err)
        });
    }

    const handleSubmitClick = () => {
        const filtered = inputList.filter((item)=> item.txid !== "" && item.vout !== "")
        if(!filtered.length){
            window.alert("You need to input utxo details before submit")
            return
        } else if(amountList.amount === "" && filtered.length ) {
            window.alert("Please enter amount you would like to send before submit")
            return
        }
        // const data = [filtered, amountList]
        const result = callAnalyzeAPI(amountList.address, amountList.amount, filtered);
        console.log(">>>>> ", result)
        return result;
    }

    const handleUtxoDetailChange = (e: { target: { value: any; }; }) => {
        // if(text === ''){
        //     setBtnDisabled(true)
        //     setMessage(null)
        // } else if(text !== '' && text.trim().length <= 10) {
        //     setMessage('Text must be at least 10 characters')
        //     setBtnDisabled(true)
        // } else{
        //     setMessage(null)
        //     setBtnDisabled(false)
        // }
        setUtxoDetails(e.target.value)
    }

    const handleAdd = (e: any) => {
        e.preventDefault()
        if(utxoDetails.trim().length > 5 && utxoDetails.trim().includes(":")){
            let newUtxoDetails = utxoDetails.split(":");
            const newUtxoData = {id: uuidv4(), txid: newUtxoDetails[0], vout: newUtxoDetails[1]}
            setInputList([newUtxoData, ...inputList])
            setUtxoDetails('')
            setShowRemove(true)
            setRemoveMessage("Remove");
            setSeperator(":");
        }
    }

    const render = () => {
        if (showRemove) {
            return (
                <div>
                    {inputList.map(detail => <><p key={detail.id}> {detail.txid}{seperator}{detail.vout}</p>  <button onClick={(e) => handleRemoveClick(e,detail.id)}>{removeMessage}</button></>)}
                </div>
            );
        }else {
            return (
                <div>
                    <p>  No UTXO Added </p>
                </div>
            );

        }
    }



    return (
        <div className="form">
            <h4 className='form-header'>Enter your transaction details</h4>
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
                {/*{inputList.map((x:UtxoProps , i:number) => {*/}
                {/*    return (  */}
                {/*                <div className="box" key={i}>*/}
                {/*                    <input*/}
                {/*                        name="transactionID"*/}
                {/*                        placeholder="Transaction ID"*/}
                {/*                        value={x.txid}*/}
                {/*                        onChange={(e) => onChangeTxidHandler(e, i, "txid")}*/}
                {/*                    />*/}
                {/*                    <input*/}
                {/*                        className="ml10"*/}
                {/*                        name="Index"*/}
                {/*                        placeholder="Vout"*/}
                {/*                        value={x.vout}*/}
                {/*                        onChange={(e) => onChangeTxidHandler(e, i, "vout")}*/}
                {/*                    />*/}
                {/*                    <div className="btn-box">*/}
                {/*                        {inputList.length !== 1 && <button*/}
                {/*                            className="mr10"*/}
                {/*                            onClick={(e) => handleRemoveClick(e,i)}>Remove</button>}*/}
                {/*                        /!* {inputList.length - 1 === i && <button onClick={handleAddClick}>Add</button>} *!/*/}
                {/*                    </div>*/}
                {/*                </div>*/}
                {/*            );*/}
                {/*})}*/}

            </div>
            <form onSubmit={handleAdd}>
                <div className='input-group'>
                    <input onChange={handleUtxoDetailChange} type='text' placeholder='input outpoint in form (txid:vout)' value={utxoDetails} />
                    <button type='submit' >Add Outpoint</button>
                </div>
            </form>

            {render()}

            <div className='btn-wrapper'>
                {/*<button onClick={handleAddClick}>Add</button>*/}
                <button onClick={handleSubmitClick}>Submit</button>
            </div>

            {/* <div style={{ marginTop: 20 }}>{JSON.stringify(inputList)}</div> */}
        </div>
    );
}

export default Form;