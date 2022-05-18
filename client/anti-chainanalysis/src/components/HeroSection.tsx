import React from 'react'
import './HeroSection.css'
import Form from './Form';

function HeroSection() {
  return (
        <div className='hero-container'>
            <div className='text'>
              <h1>Want to improve Privacy?</h1>
              <p>Paste your UTXOs and get the best combination to transact more privately</p>
            </div>
            <Form />
        </div>
    );
}

export default HeroSection;