import React, {useState} from 'react'
import './HeroSection.css'
import Form from './Form';
import UtxoDataForm from "./UtxoDataForm";
import UtxoDataList from "./UtxoDataList";
import {v4 as uuidv4} from 'uuid';
import UtxoAdditionalData from "./UtxoAdditionalData";
import Button from "./shared/Button";
import axios from "axios";
import UtxoDataItem from "./UtxoDataItem";


interface UtxoProps {
    id: string;
    txid: string;
    vout: string;
    index?: number;
}


function HeroSection() {
    const [inputList, setInputList] = useState<Array<UtxoProps>>([]);
    const [utxoDestination, setUtxoDestination] = useState('');
    const [amount, setAmount] = useState("0");
    const [responseMessage, setResponseMessage] = useState('');
    const [responseData, setResponseData] = useState([{ txid: "", vout: "" }]);


    const handleRemove = (id: string) => {
        // if(window.confirm('Are you sure you want to delete?')){
        setInputList(inputList.filter((item) => item.id !== id))
        // }
    };

    const handleUtxoDestination = (utxoDestination: string) => {
        setUtxoDestination(utxoDestination)
    };

    const handleAmount = (amount: string) => {
        setAmount(amount)
    };

    const addUtxoData = (utxoDetails: any) => {
        // newUtxoData.id = uuidv4()
        // setInputList([newUtxoData, ...inputList])
        let newUtxoDetails = utxoDetails.split(":");
        const newUtxoData = {id: uuidv4(), txid: newUtxoDetails[0], vout: newUtxoDetails[1]}
        setInputList([newUtxoData, ...inputList])
        console.log(">>>>>>", inputList)
    }

    const handleSubmitClick = () => {
        const filtered = inputList.filter((item) => item.txid !== "" && item.vout !== "")
        if (!filtered.length) {
            window.alert("You need to input utxo details before submit")
            return
        } else if (amount === "") {
            window.alert("Please enter amount you would like to send before submit")
            return
        } else if (utxoDestination === "") {
            window.alert("Please enter Destination Address before submit")
            return
        }
        // const data = [filtered, amountList]
        const result = callAnalyzeAPI(utxoDestination, amount, filtered);
        console.log(">>>>> ", result)
        return result;
    }

    const callAnalyzeAPI = (destinationAddress: string, amount: string, outputs: { txid: string; vout: string; }[]) => {
        console.log("=====got here =======")
        axios.post('http://localhost:4000/api/utxo/analyze', {
            destinationAddress: destinationAddress,
            amount: amount,
            utxos: outputs
        }).then(response => {
            console.log("[+]", response.data);
            if (response.data) {
                console.log("Do More HERE")
                setResponseMessage(response.data.message);
                setResponseData(response.data.data);
            }
        }).catch((err) => {
            console.log(err)
        });
    }

    const renderSubmitButton = () => {
        if (inputList.length !== 0) {
            return <div className='center-button'>
                <button className='btn btn-primary' onClick={handleSubmitClick}>Submit</button>
            </div>
        }
    }

    const renderResult = () => {
        return (<>
            <div className='message'>{responseMessage}</div>
            <div>
                {responseData.map(response => <p> {response.txid}:{response.vout}</p>)}
            </div>
        </>);


    }

    return (
        // <div className='hero-container'>
        <div className='container'>
            <div className='text'>
                <h1>Want to improve Privacy?</h1>
                <p>Paste your UTXOs and get the best combination to transact more privately</p>
            </div>
            {/*<Form />*/}
            <UtxoDataForm handleAdd={addUtxoData} handleAmount={handleAmount}
                          handleUtxoDestination={handleUtxoDestination}/>
            <UtxoAdditionalData inputList={inputList} amount={amount} utxoDestination={utxoDestination}/>
            <UtxoDataList inputList={inputList} handleRemove={handleRemove}/>
            {renderSubmitButton()}
            {renderResult()}
        </div>
    );
}

export default HeroSection;