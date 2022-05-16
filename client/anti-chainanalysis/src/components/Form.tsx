


import React, { ChangeEvent, useState } from "react";
import './Form.css'

function Form() {
    interface UtxoProps {
        transactionID: string;
        vout: number;
      }

    interface InfoProps {
        address: string;
        amount: number;
    }
    const [inputList, setInputList] = useState<Array<UtxoProps>>([{ transactionID: "", vout: 0 }]);
    const [amountList, setAmountList] = useState<Array<InfoProps>>([{ amount: 0, address: "" }]);

    // handle input change
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {

        console.log(e, index)
        const { name, value } = e.target;
        const list = [...inputList];
        // const obj = list[index]
        // console.log(name)
        // obj[name as keyof UtxoProps] = value;
        // list[index][name] = value;
        setInputList(list);
    };
    const handleAmountChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
        const { name, value } = e.target;
        const list = [...amountList];
        // console.log(list);
        
        // list[index][name] = value;
        setAmountList(list);
    };

    // handle click event of the Remove button
    const handleRemoveClick = (index: number) => {
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
    };

    // handle click event of the Add button
    const handleAddClick = () => {
        // setInputList([...inputList, { transactionID: "", vout: "" }]);
    };

    return (
        <div className="form">
            <h3 className='form-header'>Best UTXO combinator</h3>
            <div className="wrapper"> 
            {inputList.map((x:UtxoProps , i:number) => {
                return (
                        <div className="box">
                            <input
                                name="transactionID"
                                placeholder="Enter the UTXO's transaction ID here"
                                value={x.transactionID}
                                // value={""}
                                defaultValue={""}
                                onChange={e => handleInputChange(e, i)}
                            />
                            <input
                                className="ml10"
                                name="Index"
                                placeholder="Enter the UTXO's index/vout here"
                                value={x.vout}
                                onChange={e => handleInputChange(e, i)}
                            />
                            <div className="btn-box">
                                {inputList.length !== 1 && <button
                                    className="mr10"
                                    onClick={() => handleRemoveClick(i)}>Remove</button>}
                                {/* {inputList.length - 1 === i && <button onClick={handleAddClick}>Add</button>} */}
                            </div>
                        </div>

                );
            })}

            </div>
            <div className='btn-wrapper'>
                <button onClick={handleAddClick}>Add</button>
                <button>Submit</button>
            </div>
            
            {/* <div style={{ marginTop: 20 }}>{JSON.stringify(inputList)}</div> */}
        </div>
    );
}

export default Form;