import React, { useState } from "react";
import "./HeroSection.css";
import UtxoDataForm from "./UtxoDataForm";
import UtxoDataList from "./UtxoDataList";
import { v4 as uuidv4 } from "uuid";
import UtxoAdditionalData from "./UtxoAdditionalData";
import axios from "axios";
import { FaTimes } from "react-icons/fa";

interface UtxoProps {
  id: string;
  txid: string;
  vout: string;
  index?: number;
}

function HeroSection() {
  const [inputList, setInputList] = useState<Array<UtxoProps>>([]);
  const [utxoDestination, setUtxoDestination] = useState("");
  const [amount, setAmount] = useState("0");
  const [responseMessage, setResponseMessage] = useState("");
  const [responseStatus, setResponseStatus] = useState("");
  const [responseData, setResponseData] = useState([{ txid: "", vout: "" }]);
  const separator = ":";

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleRemove = (id: string) => {
    setInputList(inputList.filter((item) => item.id !== id));
  };

  const handleUtxoDestination = (utxoDestination: string) => {
    setUtxoDestination(utxoDestination);
  };

  const handleAmount = (amount: string) => {
    setAmount(amount);
  };

  const addUtxoData = (utxoDetails: any) => {
    let newUtxoDetails = utxoDetails.split(":");
    const newUtxoData = {
      id: uuidv4(),
      txid: newUtxoDetails[0],
      vout: newUtxoDetails[1],
    };
    setInputList([newUtxoData, ...inputList]);
  };

  const handleSubmitClick = () => {
    const filtered = inputList.filter(
      (item) => item.txid !== "" && item.vout !== ""
    );
    if (!filtered.length) {
      window.alert("You need to input utxo details before submit");
      return;
    } else if (amount === "") {
      window.alert("Please enter amount you would like to send before submit");
      return;
    } else if (utxoDestination === "") {
      window.alert("Please enter Destination Address before submit");
      return;
    }
    const result = callAnalyzeAPI(utxoDestination, amount, filtered);
    return result;
  };

  const callAnalyzeAPI = (
    destinationAddress: string,
    amount: string,
    outputs: { txid: string; vout: string }[]
  ) => {
    axios
      .post("http://localhost:4000/api/utxo/analyze", {
        destinationAddress: destinationAddress,
        amount: amount,
        utxos: outputs,
      })
      .then((response) => {
        console.log("[+]", response.data);
        if (response.data) {
          console.log("Do More HERE");
          setResponseMessage(response.data.message);
          setResponseData(response.data.data);
          setResponseStatus(response.data.status);
          handleShow();
          renderResponse();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const renderSubmitButton = () => {
    if (inputList.length !== 0) {
      return (
        <div className="center-button">
          <button
            className="btn btn-primary submit"
            onClick={handleSubmitClick}
          >
            Submit
          </button>
        </div>
      );
    }
  };

  const renderResponse = () => {
    return (
      <>
        {show && (
          <div className="modal-container">
            <div className="modal">
              <div>
                <button className="close-btn" onClick={handleClose}>
                  <FaTimes color="purple" />
                </button>
              </div>
              {responseStatus === "03" && (
                <div className="msg">
                  <b>Warning!</b>
                  <div className="response">{responseMessage}</div>
                </div>
              )}
              <div className="title">
                Best UTXO combination
                <br />
              </div>
              {responseData && (
                <div className="message">
                  {responseData.map((response, index) => (
                    <p className="data">
                      {index + 1}. {response.txid}
                      {separator}
                      {response.vout}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </>
    );
  };

  return (
    <>
      <div className="container">
        <div className="text">
          <h1>Want to improve Privacy?</h1>
          <br />
          <p>
            Paste your UTXOs and get the best combination to transact <br />{" "}
            more privately
          </p>
        </div>
        <UtxoDataForm
          handleAdd={addUtxoData}
          handleAmount={handleAmount}
          handleUtxoDestination={handleUtxoDestination}
        />
        <UtxoAdditionalData
          inputList={inputList}
          amount={amount}
          utxoDestination={utxoDestination}
        />
        <UtxoDataList inputList={inputList} handleRemove={handleRemove} />
        {renderSubmitButton()}
      </div>
      {renderResponse()}
    </>
  );
}

export default HeroSection;
