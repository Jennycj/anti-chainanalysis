import React from 'react'
import './HeroSection.css'
import Form from './Form';

function HeroSection() {
  return (
        <div className='hero-container'>
            <div className='text'>
            <h1>Keep your dealings private</h1>
            <p>Paste your UTXOs and get the best combination to transact more privately</p>
            </div>
            <div className='form'>
                <Form />
            </div>
        </div>
    );
}

export default HeroSection;