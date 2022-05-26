import React, { useState } from "react";
import Card from "./shared/Card";
import Button from "./shared/Button";

export default function UtxoDataForm({
  handleAdd,
  handleAmount,
  handleUtxoDestination,
}: any) {
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [message, setMessage] = useState("");
  const [utxoDetails, setUtxoDetails] = useState("");

  const handleUtxoDetailsChange = (e: { target: { value: any } }) => {
    if (utxoDetails === "") {
      setBtnDisabled(true);
      setMessage("");
    } else if (utxoDetails !== "" && utxoDetails.trim().length <= 5) {
      setMessage("Text must be at least 5 characters");
      setBtnDisabled(true);
    } else if (!utxoDetails.includes(":")) {
      setMessage("Text must include :");
      setBtnDisabled(true);
    } else {
      setMessage("");
      setBtnDisabled(false);
    }
    setUtxoDetails(e.target.value);
  };

  const handleUtxoDestinationChange = (e: { target: { value: any } }) => {
    handleUtxoDestination(e.target.value);
  };

  const handleUtxoAmoutnChange = (e: { target: { value: any } }) => {
    handleAmount(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (utxoDetails.trim().length > 5) {
      handleAdd(utxoDetails);
      setUtxoDetails("");
    }
  };

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            onChange={handleUtxoDestinationChange}
            type="text"
            placeholder="Destination Address"
          />
        </div>
        <div className="input-group">
          <input
            onChange={handleUtxoAmoutnChange}
            type="text"
            placeholder="Amount"
          />
        </div>

        <div className="input-group">
          <input
            onChange={handleUtxoDetailsChange}
            type="text"
            placeholder="Add one or more outpoint in the form (txid:vout)"
            value={utxoDetails}
          />
          <Button type="submit" isDisabled={btnDisabled}>
            Add
          </Button>
        </div>
        {message && <div className="message">{message}</div>}
      </form>
    </Card>
  );
}
