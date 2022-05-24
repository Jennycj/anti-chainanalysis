import React from 'react'
import PropTypes from 'prop-types'

function  UtxoAdditionalData({inputList, amount, utxoDestination}: any) {

  return (
    <div className='feedback-stats'>
        <h4> Amount: {amount} </h4>
        <h4> Address: {utxoDestination} </h4>
    </div>
  )
}

UtxoAdditionalData.protoType = {
    inputList: PropTypes.array.isRequired
}

export default UtxoAdditionalData