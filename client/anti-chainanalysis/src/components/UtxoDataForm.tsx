import React, { useState } from 'react'
import Card from './shared/Card'
import Button from './shared/Button'
import {v4 as uuidv4} from 'uuid';
import UtxoDataList from "./UtxoDataList";

interface UtxoProps {
  id: string;
  txid: string;
  vout: string;
  index?: number;
}


export default function UtxoDataForm({handleAdd, handleAmount, handleUtxoDestination}: any) {

  const [btnDisabled, setBtnDisabled] = useState(true)
  const [message, setMessage] = useState('')
  const [rating, setRating] = useState(10)
  const [utxoDetails, setUtxoDetails] = useState('');


  const handleUtxoDetailsChange = (e: { target: { value: any; }; }) => {
    if(utxoDetails === ''){
      setBtnDisabled(true)
      setMessage('')
    } else if(utxoDetails !== '' && utxoDetails.trim().length <= 5) {
      setMessage('Text must be at least 5 characters')
      setBtnDisabled(true)
    } else if(!utxoDetails.includes(":")) {
      setMessage('Text must include :')
      setBtnDisabled(true)
    }  else{
      setMessage('')
      setBtnDisabled(false)
    }
    setUtxoDetails(e.target.value)
  }

  const handleUtxoDestinationChange = (e: { target: { value: any; }; }) => {
    handleUtxoDestination(e.target.value)
  }

  const handleUtxoAmoutnChange = (e: { target: { value: any; }; }) => {
    handleAmount(e.target.value)
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    if(utxoDetails.trim().length > 5){
      handleAdd(utxoDetails)
      setUtxoDetails('')
    }
  }

  return (
        <Card>
          <form onSubmit={handleSubmit}>
          <div className='input-group'>
          <input onChange={handleUtxoDestinationChange} type='text' placeholder='Destination Address' />
          {/*<Button type='submit' isDisabled={btnDisabled}>Add</Button>*/}
        </div>
        <div className='input-group'>
          <input onChange={handleUtxoAmoutnChange} type='text' placeholder='Amount' />
          {/*<Button type='submit' isDisabled={btnDisabled}>Add</Button>*/}
        </div>

        <div className='input-group'>
            <input onChange={handleUtxoDetailsChange} type='text' placeholder='Add one or more outpoint in form (txid:vout)' value={utxoDetails} />
            <Button type='submit' isDisabled={btnDisabled}>Add</Button>
          </div>
          {message && <div className='message'>{message}</div>}
        </form>
      </Card>
  )

  //
  // return (
  //     <>
  //       <Card>
  //         <form onSubmit={handleSubmit}>
  //           <h2>How would you rate your service with us</h2>
  //           {/*<RatingSelect select={(rating) => setRating(rating) }/>*/}
  //           <div className='input-group'>
  //             {/*<input onChange={handleTextChange} type='text' placeholder='Amount in bitcoin' value={text} />*/}
  //             {/*<input onChange={handleTextChange} type='text' placeholder='Destination Address' value={text} />*/}
  //             <input onChange={handleUtxoDetailsChange} type='text' placeholder='Input outpoint in form (txid:vout)' value={utxoDetails} />
  //             <Button type='submit' isDisabled={btnDisabled}>Send</Button>
  //           </div>
  //           {message && <div className='message'>{message}</div>}
  //         </form>
  //       </Card>
  //     </>
  //
  // )
}
